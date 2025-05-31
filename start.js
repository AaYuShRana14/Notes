const { spawn } = require("child_process");
const path = require("path");

async function frontend() {
  const frontend = spawn("npm", ["start"], {
    cwd: path.join(__dirname, "frontend"),
    shell: true,
  });

  frontend.stdout.on("data", (data) => {
    console.log(`frontend: ${data}`);
  });

  frontend.stderr.on("data", (data) => {
    console.error(`frontend: ${data}`);
  });

  frontend.on("close", (code) => {
    console.log(`frontend exited with code ${code}`);
  });
}

async function backend() {
  const backend = spawn("npm", ["start"], {
    cwd: path.join(__dirname, "backend"),
    shell: true,
  });

  backend.stdout.on("data", (data) => {
    console.log(`backend: ${data}`);
  });

  backend.stderr.on("data", (data) => {
    console.error(`backend: ${data}`);
  });

  backend.on("close", (code) => {
    console.log(`backend exited with code ${code}`);
  });
}

frontend();
backend();