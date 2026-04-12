---
name: ba-n8n-node-config
description: "Operation-aware node configuration guidance. Use when configuring nodes, understanding property dependencies, or determining required fields."
---

# HƯỚNG DẪN SKILL: BA N8N NODE CONFIG

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Expert guidance for operation-aware node configuration with a focus on property dependencies.

---

## 🎯 Purpose
Guide BAs in configuring n8n nodes correctly by understanding that requirements change based on the selected **Resource** and **Operation**.

---

## 📋 Core Concepts

1. **Operation-Aware**: Fields like `channel` might be required for `post` but optional for `update`.
2. **Property Dependencies**: Some fields only appear when others are set (e.g., `sendBody` must be `true` for `body` to show in HTTP Request).
3. **Progressive Disclosure**: Start with minimal config and let validation guide you to add more.

---

## 🛠️ Configuration Workflow
1. Identify **Node Type** and **Operation**.
2. Use `get_node` (standard detail) to see requirements.
3. Configure required fields.
4. Run `validate_node` to check for missing dependencies.
5. Search for specific properties if stuck using `get_node` with `mode: "search_properties"`.

---

## 🚨 Common Patterns

- **Resource/Operation Nodes** (Slack, Sheets): Select Resource → Select Operation → Configure specific fields.
- **HTTP Request**: method is key. POST/PUT often require `sendBody: true`.
- **Database Nodes**: `insert` needs table+values; `update` needs table+values+where.
- **Logic Nodes** (IF/Switch): Binary operators need two values; unary (isEmpty) need one value and `singleValue: true`.

---

## 📄 Reference
- [DEPENDENCIES.md](DEPENDENCIES.md) - Field visibility rules.
- [OPERATION_PATTERNS.md](OPERATION_PATTERNS.md) - Patterns by node type.

