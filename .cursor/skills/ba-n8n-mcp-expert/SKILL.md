---
name: ba-n8n-mcp-expert
description: "Expert guide for using n8n-mcp MCP tools effectively. Use when searching for nodes, validating configurations, accessing templates, managing workflows, or using any n8n-mcp tool."
---

# HƯỚNG DẪN SKILL: BA N8N MCP EXPERT

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Master guide for using n8n-mcp tools to build, validate, and manage workflows.

---

## 🎯 Purpose
Provide BA with the technical expertise to use MCP tools for node discovery, configuration validation, and workflow deployment.

---

## 🛠️ Essential Tools (Quick Reference)

| Tool | Purpose | Recommendation |
|------|---------|----------------|
| `search_nodes` | Find nodes by keyword | Start here to find what's available. |
| `get_node` | Understand properties | Use `detail="standard"` (default) to save tokens. |
| `validate_node` | Check configuration | Use `profile="runtime"` before deployment. |
| `n8n_create_workflow` | Create new workflow | Use iterative updates rather than one-shot. |
| `n8n_deploy_template` | Use existing template | Best way to start with proven patterns. |

---

## 🚨 Critical: nodeType Format Difference

1. **Search/Validate Tools** (e.g., `get_node`, `validate_node`):
   - Use: `"nodes-base.slack"`, `"nodes-base.httpRequest"`
2. **Workflow Management Tools** (e.g., `n8n_create_workflow`):
   - Use: `"n8n-nodes-base.slack"`, `"n8n-nodes-base.httpRequest"`

---

## 📋 Common Best Practices

1. **Iterate, Don't One-Shot**: Build workflows step-by-step. Average 56s between edits is normal.
2. **Intent Parameter**: Always include the `intent` field in workflow updates to help the system understand the context.
3. **Smart Connections**: Use `branch="true"` for IF nodes and `case=0` for Switch nodes instead of manual `sourceIndex`.
4. **Validation Profiles**: Use `runtime` for standard checks and `ai-friendly` when dealing with AI agent nodes.

---

## 📄 Reference Guides
- [SEARCH_GUIDE.md](SEARCH_GUIDE.md) - Deep dive into discovery.
- [VALIDATION_GUIDE.md](VALIDATION_GUIDE.md) - How to fix configuration errors.
- [WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md) - Managing complete workflows.

