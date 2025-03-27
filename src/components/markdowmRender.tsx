'use client'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  content: string
  className?: string
}

interface CodeComponentProps {
  className?: string;
  children: React.ReactNode;
  inline?: boolean;
  [key: string]: unknown;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { className, children, ...rest } = props as CodeComponentProps;
            const match = /language-(\w+)/.exec(className || '')
            const inline = (props as CodeComponentProps).inline;
            
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                className="rounded-md overflow-hidden my-6"
                {...rest}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={`${className} rounded bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5`} {...rest}>
                {children}
              </code>
            )
          },
          h1({ children }) { 
            return <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
          },
          h2({ children }) { 
            return <h2 className="text-2xl font-bold mt-6 mb-4">{children}</h2>
          },
          h3({ children }) { 
            return <h3 className="text-xl font-bold mt-4 mb-3">{children}</h3>
          },
          p({ children }) { 
            return <p className="my-4">{children}</p>
          },
          ul({ children }) { 
            return <ul className="list-disc pl-6 my-4">{children}</ul>
          },
          ol({ children }) { 
            return <ol className="list-decimal pl-6 my-4">{children}</ol>
          },
          blockquote({ children }) { 
            return <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 italic my-4">{children}</blockquote>
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}