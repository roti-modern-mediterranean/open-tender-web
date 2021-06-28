
interface HeadingProps {
  size?: string
}

declare module "@open-tender/components" {
  export const Heading: (props:HeadingProps) => JSX.Element
}
