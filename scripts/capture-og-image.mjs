/**
 * Captures the portfolio board for Open Graph previews (1200×630).
 * Requires a built app. Starts preview automatically unless OG_CAPTURE_URL is reachable.
 */
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "public/og-image.png");
const url = process.env.OG_CAPTURE_URL ?? "http://127.0.0.1:4173";
const viewport = { height: 630, width: 1200 };
const PREVIEW_START_TIMEOUT_MS = 60_000;
const SERVER_POLL_INTERVAL_MS = 500;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isReachable = async (targetUrl) => {
	try {
		const response = await fetch(targetUrl, {
			signal: AbortSignal.timeout(2000),
		});
		return response.ok;
	} catch {
		return false;
	}
};

const waitForServer = async (
	targetUrl,
	{
		timeoutMs = PREVIEW_START_TIMEOUT_MS,
		intervalMs = SERVER_POLL_INTERVAL_MS,
	} = {}
) => {
	const deadline = Date.now() + timeoutMs;

	const poll = async () => {
		if (await isReachable(targetUrl)) {
			return;
		}
		if (Date.now() >= deadline) {
			throw new Error(
				`Server at ${targetUrl} not reachable within ${timeoutMs}ms`
			);
		}
		await wait(intervalMs);
		await poll();
	};

	await poll();
};

const startPreview = async () => {
	const child = spawn(
		"npm",
		["run", "preview", "--", "--port", "4173", "--host", "127.0.0.1"],
		{
			cwd: root,
			env: { ...process.env, FORCE_COLOR: "0" },
			stdio: "ignore",
		}
	);

	let settled = false;

	const failIfExitsEarly = new Promise((_, reject) => {
		const onFail = (error) => {
			if (settled) {
				return;
			}
			settled = true;
			child.kill();
			reject(error);
		};

		child.once("error", onFail);
		child.once("exit", (code) => {
			onFail(new Error(`Preview exited with code ${code ?? "unknown"}`));
		});
	});

	try {
		await Promise.race([
			waitForServer(url).then(() => {
				settled = true;
			}),
			failIfExitsEarly,
		]);
		return child;
	} catch (error) {
		if (!settled) {
			child.kill();
		}
		throw error;
	}
};

let previewProcess = null;

if (!(await isReachable(url))) {
	previewProcess = await startPreview();
}

const { chromium } = await import("playwright");
const browser = await chromium.launch();

try {
	const page = await browser.newPage({ viewport });
	await page.goto(url, { timeout: 60_000, waitUntil: "networkidle" });
	await page.waitForSelector('[aria-label="Portfolio board"]', {
		timeout: 30_000,
	});
	await page.getByRole("heading", { name: "Hey, I'm Killian." }).waitFor({
		timeout: 30_000,
	});
	await page.evaluate(() => document.fonts.ready);
	await wait(800);

	await page.locator('[aria-label="Portfolio board"]').screenshot({
		path: output,
		type: "png",
	});

	console.log(
		`Wrote ${output} (${viewport.width}×${viewport.height}) from ${url}`
	);
} finally {
	await browser.close();
	if (previewProcess) {
		previewProcess.kill("SIGTERM");
	}
}
