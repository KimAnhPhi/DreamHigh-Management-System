---
name: ba-n8n-python-code
description: "Write Python code in n8n Code nodes. Use when writing Python in n8n, using _input/_json/_node syntax, or working with standard library."
---

# HƯỚNG DẪN SKILL: BA N8N PYTHON CODE

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Guide for writing Python in n8n nodes with awareness of its limitations.

---

## 🎯 Purpose
Provide BAs with Python support when JS is not preferred, emphasizing standard library usage and data access patterns.

---

## ⚠️ Critical Reminder: JavaScript First
**Use JavaScript for 95% of use cases.** JavaScript has better helper support (`$helpers.httpRequest`) and is preferred by the n8n community.

---

## 📋 Python Rules

1. **No External Libraries**: You CANNOT use `requests`, `pandas`, `numpy`, or any non-standard library.
2. **Access**: Use `_input.all()` for all items and `_json["body"]` for webhook data.
3. **Return Format**: MUST return a list of dictionaries: `return [{"json": { ... }}]`.
4. **Standard Library**: Use `json`, `datetime`, `re` (regex), and `statistics` for logic.

---

## 🛠️ Common Patterns

- **Transformation**: Use list comprehensions: `[{"json": {...}} for item in items]`.
- **Aggregation**: Use `sum()`, `len()`, or `statistics.mean()` on items.
- **Regex**: Use `import re` for complex text extraction.

---

## 🚨 Top Mistakes
- **No `requests`**: Use HTTP Request node + Code node instead.
- **KeyError**: Use `.get()` for safe dictionary access: `item["json"].get("field")`.
- **Missing Wrapper**: Returning a plain dict instead of a list of dicts.

---

## 📄 Reference
- [DATA_ACCESS.md](DATA_ACCESS.md) - Python data access.
- [STANDARD_LIBRARY.md](STANDARD_LIBRARY.md) - What's available.

