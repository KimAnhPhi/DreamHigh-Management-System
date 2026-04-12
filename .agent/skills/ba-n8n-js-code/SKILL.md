---
name: ba-n8n-js-code
description: "Write JavaScript code in n8n Code nodes. Use when writing JavaScript in n8n, using $input/$json/$node syntax, making HTTP requests with $helpers, working with dates, or troubleshooting Code node errors."
---

# HƯỚNG DẪN SKILL: BA N8N JS CODE

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Expert guide for writing efficient JavaScript in n8n Code nodes.

---

## 🎯 Purpose
Help BAs implement complex logic, data transformations, and custom API calls using JavaScript within n8n.

---

## 📋 Essential Rules

1. **Mode**: Prefer "Run Once for All Items" for aggregations and "Each Item" for independent transforms.
2. **Access**: Use `$input.all()` for all items or `$input.first().json` for single objects.
3. **Webhook Data**: Always access via `$json.body` (e.g., `$json.body.email`).
4. **Return Format**: MUST return an array of objects: `return [{ json: { ... } }];`.
5. **Helpers**: Use `$helpers.httpRequest()` for APIs and `DateTime` (Luxon) for dates.

---

## 🛠️ Common Patterns

- **Aggregation**: Use `.reduce()` or `.map()` on `$input.all()`.
- **Filtering**: Use `.filter()` to remove unnecessary data early.
- **Transformation**: Map fields from source to target structure.
- **Error Handling**: Use `try/catch` and return an error object in `json` if needed.

---

## 🚨 Top Mistakes to Avoid
- **Empty Return**: Always include a `return` statement.
- **Expression Syntax**: Don't use `{{ }}` inside a Code node.
- **Wrappers**: Returning a plain object instead of `[{json: { ... }}]`.
- **Null Checks**: Use optional chaining `const v = item.json?.field;`.

---

## 📄 Reference
- [DATA_ACCESS.md](DATA_ACCESS.md) - How to get data.
- [COMMON_PATTERNS.md](COMMON_PATTERNS.md) - Code snippets.
- [ERROR_PATTERNS.md](ERROR_PATTERNS.md) - Common fixes.

