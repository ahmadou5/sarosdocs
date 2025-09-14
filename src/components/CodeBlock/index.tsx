import React, { useState, useMemo, useCallback } from "react";
import styles from "../CodeBlock/index.module.css";

interface CodeBlockProps {
  code: string;
  filename: string;
  language?: string;
  showCopy?: boolean;
  showLineNumbers?: boolean;
  maxHeight?: string;
  theme?: "dark" | "light";
}

// Language-specific keyword mappings
const LANGUAGE_KEYWORDS = {
  typescript: [
    "abstract",
    "as",
    "async",
    "await",
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "declare",
    "default",
    "delete",
    "do",
    "else",
    "enum",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "from",
    "function",
    "get",
    "if",
    "implements",
    "import",
    "in",
    "infer",
    "instanceof",
    "interface",
    "is",
    "keyof",
    "let",
    "namespace",
    "new",
    "null",
    "of",
    "package",
    "private",
    "protected",
    "public",
    "readonly",
    "return",
    "satisfies",
    "set",
    "static",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "type",
    "typeof",
    "undefined",
    "var",
    "void",
    "while",
    "with",
    "yield",
  ],
  javascript: [
    "async",
    "await",
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "from",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "let",
    "new",
    "null",
    "return",
    "static",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "undefined",
    "var",
    "void",
    "while",
    "with",
    "yield",
  ],
  react: [
    "React",
    "ReactNode",
    "JSX",
    "Element",
    "Component",
    "Props",
    "State",
    "useState",
    "useEffect",
    "useContext",
    "useReducer",
    "useCallback",
    "useMemo",
    "useRef",
    "useImperativeHandle",
    "useLayoutEffect",
    "useDebugValue",
    "FC",
    "PropsWithChildren",
    "ComponentProps",
  ],
};

// Enhanced code formatter with better logic separation
class CodeFormatter {
  private indentSize: number;
  private currentIndent: number;
  private inMultiLineComment: boolean;
  private inString: boolean;
  private stringDelimiter: string;

  constructor(indentSize = 2) {
    this.indentSize = indentSize;
    this.currentIndent = 0;
    this.inMultiLineComment = false;
    this.inString = false;
    this.stringDelimiter = "";
  }

  format(code: string): string {
    const lines = code.split("\n");
    const formattedLines: string[] = [];

    for (const line of lines) {
      const formattedLine = this.formatLine(line);
      formattedLines.push(formattedLine);
    }

    return formattedLines.join("\n");
  }

  private formatLine(line: string): string {
    const trimmed = line.trim();

    // Preserve empty lines
    if (!trimmed) return "";

    // Update context state
    this.updateContextState(trimmed);

    // Handle indentation
    const indent = this.calculateIndent(trimmed);
    let formatted = " ".repeat(indent) + trimmed;

    // Apply formatting only to non-comment, non-string content
    if (
      !this.inMultiLineComment &&
      !this.isComment(trimmed) &&
      !this.inString
    ) {
      formatted = this.applyFormatting(formatted);
    }

    return formatted;
  }

  private updateContextState(line: string): void {
    // Track multi-line comments
    if (!this.inString && line.includes("/*") && !line.includes("*/")) {
      this.inMultiLineComment = true;
    }
    if (this.inMultiLineComment && line.includes("*/")) {
      this.inMultiLineComment = false;
    }

    // Track string state (simplified for this example)
    // In production, you'd want more sophisticated string tracking
  }

  private isComment(line: string): boolean {
    return (
      line.startsWith("//") || line.startsWith("*") || line.startsWith("/*")
    );
  }

  private calculateIndent(line: string): number {
    // Decrease indent for closing brackets
    if (/^[}\])]/.test(line) || line.startsWith("</")) {
      this.currentIndent = Math.max(0, this.currentIndent - 1);
    }

    const indent = this.currentIndent * this.indentSize;

    // Increase indent for opening brackets
    if (/[{\[(]\s*$/.test(line) || this.isOpeningJSXTag(line)) {
      this.currentIndent++;
    }

    return indent;
  }

  private isOpeningJSXTag(line: string): boolean {
    return (
      line.startsWith("<") &&
      !line.startsWith("</") &&
      !line.endsWith("/>") &&
      !line.endsWith(">;")
    );
  }

  private applyFormatting(line: string): string {
    return (
      line
        // Assignment operators
        .replace(/(\w)\s*([+\-*/%]?=)\s*(?!=)/g, "$1 $2 ")
        // Comparison operators
        .replace(/([^=!<>])\s*(===|!==|==|!=|<=|>=)\s*/g, "$1 $2 ")
        // Logical operators
        .replace(/\s*(&&|\|\|)\s*/g, " $1 ")
        // Arithmetic operators
        .replace(/(\w)\s*([+\-*/%])\s*(\w)/g, "$1 $2 $3")
        // Object property spacing
        .replace(/(\w)\s*:\s*([^/\s])/g, "$1: $2")
        // Comma spacing
        .replace(/,\s*(?!\s*$)/g, ", ")
        // Control structure spacing
        .replace(/\b(if|for|while|switch|catch)\s*\(/g, "$1 (")
        .replace(/\)\s*\{/g, ") {")
        .replace(/}\s*else\s*\{/g, "} else {")
        .replace(/}\s*else\s+if\s*\(/g, "} else if (")
        // Function spacing
        .replace(/\bfunction\s*\(/g, "function (")
        // Clean up multiple spaces
        .replace(/([^"'`\s])\s{2,}([^"'`\s])/g, "$1 $2")
    );
  }
}

// Enhanced syntax highlighter with proper comment handling
class SyntaxHighlighter {
  private language: string;
  private keywords: Set<string>;

  constructor(language: string) {
    this.language = language.toLowerCase();
    this.keywords = new Set([
      ...(LANGUAGE_KEYWORDS.typescript || []),
      ...(LANGUAGE_KEYWORDS.javascript || []),
      ...(LANGUAGE_KEYWORDS.react || []),
    ]);
  }

  highlight(code: string): string {
    // First escape HTML entities
    let highlighted = this.escapeHtml(code);

    // Apply syntax highlighting in specific order to avoid conflicts
    highlighted = this.highlightComments(highlighted);
    highlighted = this.highlightStrings(highlighted);
    highlighted = this.highlightKeywords(highlighted);
    highlighted = this.highlightNumbers(highlighted);
    highlighted = this.highlightJSX(highlighted);
    highlighted = this.highlightFunctions(highlighted);

    return highlighted;
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  private highlightComments(code: string): string {
    // Multi-line comments first
    code = code.replace(/\/\*[\s\S]*?\*\//g, '<span ">$&</span>');

    // Single-line comments - be more precise to avoid conflicts
    code = code.replace(/^(\s*)\/\/(.*)$/gm, "$1<span >//$2</span>");

    return code;
  }

  private highlightStrings(code: string): string {
    // Template literals
    code = code.replace(
      /`(?:[^`\\]|\\.)*?`(?![^<]*<\/span>)/g,
      '<span class="string">$&</span>'
    );

    // Single and double quoted strings
    code = code.replace(
      /(['"])(?:(?!\1)[^\\]|\\.)*?\1(?![^<]*<\/span>)/g,
      '<span class="string">$&</span>'
    );

    return code;
  }

  private highlightKeywords(code: string): string {
    // Create pattern for all keywords
    const keywordArray = Array.from(this.keywords);
    const keywordPattern = `\\b(${keywordArray.join("|")})\\b`;

    return code.replace(
      new RegExp(keywordPattern, "g"),
      (match, p1, offset, string) => {
        // Don't highlight if already inside a span
        const beforeMatch = string.substring(0, offset);
        const openSpans = (beforeMatch.match(/<span[^>]*>/g) || []).length;
        const closeSpans = (beforeMatch.match(/<\/span>/g) || []).length;

        if (openSpans > closeSpans) {
          return match; // Inside a span, don't highlight
        }

        return `<span >${match}</span>`;
      }
    );
  }

  private highlightNumbers(code: string): string {
    return code.replace(
      /\b(\d+(?:\.\d+)?)\b(?![^<]*<\/span>)/g,
      "<span >$1</span>"
    );
  }

  private highlightJSX(code: string): string {
    // JSX tags with attributes
    code = code.replace(
      /(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s+[a-zA-Z][a-zA-Z0-9-]*(?:\s*=\s*(?:[^&\s]+|&quot;[^&]*?&quot;|&#39;[^&]*?&#39;))?)*\s*\/?)(&gt;)/g,
      '$1<span class="jsx-tag">$2</span>$3$4'
    );

    // JSX attributes
    code = code.replace(
      /(\s+)([a-zA-Z][a-zA-Z0-9-]*)(\s*=)/g,
      '$1<span class="jsx-attr">$2</span>$3'
    );

    // JSX expressions
    code = code.replace(
      /(\{[^}]*\})/g,
      '<span class="jsx-expression">$1</span>'
    );

    return code;
  }

  private highlightFunctions(code: string): string {
    return code.replace(
      /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
      '<span class="function">$1</span>'
    );
  }
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  filename,
  language = "TypeScript",
  showCopy = true,
  showLineNumbers = false,
  maxHeight,
  theme = "dark",
}) => {
  const [copied, setCopied] = useState(false);

  // Memoize formatter and highlighter instances
  const formatter = useMemo(() => new CodeFormatter(2), []);
  const highlighter = useMemo(
    () => new SyntaxHighlighter(language),
    [language]
  );

  // Memoize the formatted and highlighted code
  const processedCode = useMemo(() => {
    const formatted = formatter.format(code);
    const highlighted = highlighter.highlight(formatted);
    return highlighted;
  }, [code, formatter, highlighter]);

  // Memoize line numbers if needed
  const lineNumbers = useMemo(() => {
    if (!showLineNumbers) return null;
    const lineCount = code.split("\n").length;
    return Array.from({ length: lineCount }, (_, i) => i + 1);
  }, [code, showLineNumbers]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error("Fallback copy failed:", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  }, [code]);

  const containerStyle = {
    ...(maxHeight && { maxHeight }),
    ...(theme && { "data-theme": theme }),
  };

  return (
    <div className={styles.codeBlockContainer} style={containerStyle}>
      <div className={styles.codeHeader}>
        <div className={styles.fileInfo}>
          <svg
            className={styles.fileIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="14,2 14,8 20,8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.filename}>{filename}</span>
        </div>

        <div className={styles.headerActions}>
          <span className={styles.language}>{language}</span>

          {showCopy && (
            <button
              className={styles.copyButton}
              onClick={handleCopy}
              title={copied ? "Copied!" : "Copy to clipboard"}
              aria-label={copied ? "Code copied" : "Copy code to clipboard"}
            >
              {copied ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      <div className={styles.codeContent}>
        <div className={styles.codeWrapper}>
          {showLineNumbers && (
            <div className={styles.lineNumbers} aria-hidden="true">
              {lineNumbers?.map((num) => (
                <span key={num} className={styles.lineNumber}>
                  {num}
                </span>
              ))}
            </div>
          )}

          <pre className={styles.codeBlock}>
            <code
              className={`language-${language.toLowerCase()}`}
              dangerouslySetInnerHTML={{
                __html: processedCode,
              }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
