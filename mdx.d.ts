declare module 'mdx/types' {
  import { ComponentType } from 'react';

  export interface MDXComponents {
    [key: string]: ComponentType<any> | undefined;
  }
}


