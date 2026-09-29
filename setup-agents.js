#!/usr/bin/env node
/**
 * Project Auro — Agent Setup Script
 * Run this ONCE after first launch to configure all 6 agents with their instructions.
 * Usage: node setup-agents.js
 */

const fs = require("fs");
const path = require("path");

const BASE_URL = "http://127.0.0.1:3100";
const COMPANY_ID = process.env.AURO_COMPANY_ID; // set after first login

async function api(method, endpoint, body) {
  const res = await fetch(`${BASE_URL}/api${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${method} ${endpoint} → ${res.status}: ${text}`);
  }
  return res.json();
}

async function main() {
  // 1. Check server health
  console.log("🔍 Checking server health...");
  const health = await api("GET", "/health");
  console.log(`✅ Server: ${health.status} | Auth: ${health.authReady}`);

  // 2. Get company
  const companies = await api("GET", "/companies");
  if (!companies || companies.length === 0) {
    console.error("❌ No company found. Please log in at http://127.0.0.1:3100 first and create your workspace.");
    process.exit(1);
  }
  const company = companies[0];
  console.log(`\n🏢 Company: ${company.name} (${company.id})`);

  // 3. Get agents
  const agents = await api("GET", `/companies/${company.id}/agents`);
  console.log(`\n👥 Found ${agents.length} agents:`);
  agents.forEach(a => console.log(`   ${a.role?.toUpperCase().padEnd(10)} ${a.name} (${a.id})`));

  // 4. Apply instructions to each agent
  const agentConfigs = {
    ceo:      path.join(__dirname, "agent-configs/agents/alexander-wright/AGENTS.md"),
    cto:      path.join(__dirname, "agent-configs/agents/aria-chen/AGENTS.md"),
    pm:       path.join(__dirname, "agent-configs/agents/marcus-vance/AGENTS.md"),
    qa:       path.join(__dirname, "agent-configs/agents/david-kim/AGENTS.md"),
    security: path.join(__dirname, "agent-configs/agents/elena-rostova/AGENTS.md"),
    devops:   path.join(__dirname, "agent-configs/agents/sanjay-patel/AGENTS.md"),
  };

  console.log("\n📝 Applying agent instructions...");
  for (const agent of agents) {
    const role = agent.role?.toLowerCase();
    const configFile = agentConfigs[role];
    if (!configFile || !fs.existsSync(configFile)) {
      console.log(`   ⚠️  Skipping ${agent.name} — no config for role '${role}'`);
      continue;
    }

    const instructions = fs.readFileSync(configFile, "utf-8");
    const instructionsPath = agent.adapterConfig?.instructionsFilePath;
    if (!instructionsPath) {
      console.log(`   ⚠️  ${agent.name} — no instructionsFilePath found in adapterConfig`);
      continue;
    }

    // Write AGENTS.md directly to the agent's instructions path
    fs.writeFileSync(instructionsPath, instructions, "utf-8");
    console.log(`   ✅ ${agent.name.padEnd(20)} (${role}) — instructions applied`);
  }

  console.log("\n✅ Setup complete! All agents are configured.");
  console.log("🚀 Open http://127.0.0.1:3100 and create a project assigned to Alexander Wright (CEO).");
}

main().catch(err => {
  console.error("❌ Setup failed:", err.message);
  process.exit(1);
});
