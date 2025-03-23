const { exec } = require("child_process");

exports.handler = async (event) => {
  return new Promise((resolve, reject) => {
    let script = event.type === "check-in" ? "check-in.js" : "check-out.js";
    exec(`node ${script}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        reject(error);
      } else {
        console.log(`Output: ${stdout}`);
        resolve(stdout);
      }
    });
  });
}
(async () => {
    try {
      console.log("🔹 Running Check-In...");
      await exports.handler({ type: "check-in" });
      console.log("✅ Check-In Completed!");
    } catch (error) {
      console.error("❌ Error:", error);
    }
  })();