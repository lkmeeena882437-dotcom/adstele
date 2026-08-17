import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { m } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

interface RevealLineProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
}

export function RevealLine({ children, className = '', innerClassName = '', delay = 0 }: RevealLineProps) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className}`}>
      <m.span
        className={`block ${innerClassName}`}
        initial={{ y: '115%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay, ease }}
      >
        {children}
      </m.span>
    </span>
  );
}

interface WordRevealProps {
  children: ReactNode;
  className?: string;
  solidClassName?: string;
}

let wordId = 0;

function words(node: ReactNode, solidClassName: string, nested = false): ReactNode {
  return Children.map(node, child => {
    if (typeof child === 'string') {
      return child.split(/(\s+)/).map(part => {
        if (/^\s+$/.test(part)) return part;
        const key = `${part}-${wordId++}`;
        return (
          <span key={key} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
            <m.span
              className={`inline-block ${!nested ? solidClassName : ''}`}
              variants={{ hidden: { y: '115%' }, show: { y: 0 } }}
              transition={{ duration: 0.72, ease }}
            >
              {part}
            </m.span>
          </span>
        );
      });
    }
    if (isValidElement(child)) {
      const element = child as ReactElement<{ children?: ReactNode }>;
      return cloneElement(element, {
        children: words(element.props.children, solidClassName, true),
      });
    }
    return child;
  });
}

export function WordReveal({ children, className = '', solidClassName = '' }: WordRevealProps) {
  return (
    <m.span
      className={`block ${className}`}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.45 }}
    >
      {words(children, solidClassName)}
    </m.span>
  );
}
