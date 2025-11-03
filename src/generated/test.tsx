/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
function _createMdxContent(props) {
  const _components = {
    code: "code",
    em: "em",
    h1: "h1",
    li: "li",
    p: "p",
    pre: "pre",
    strong: "strong",
    ul: "ul",
    ...props.components,
  };
  return (
    <>
      <_components.h1>{"你好，世界 👋"}</_components.h1>
      {"\n"}
      <_components.p>{"这是一段静态生成的 Markdown。"}</_components.p>
      {"\n"}
      <_components.ul>
        {"\n"}
        <_components.li>
          {"支持 "}
          <_components.strong>{"加粗"}</_components.strong>
        </_components.li>
        {"\n"}
        <_components.li>
          {"支持 "}
          <_components.em>{"斜体"}</_components.em>
        </_components.li>
        {"\n"}
        <_components.li>{"支持代码块："}</_components.li>
        {"\n"}
      </_components.ul>
      {"\n"}
      <_components.pre>
        <_components.code className="language-tsx">
          {"export const Hello = () => <div>Hello Markdown</div>;\n"}
        </_components.code>
      </_components.pre>
    </>
  );
}
export default function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? (
    <MDXLayout {...props}>
      <_createMdxContent {...props} />
    </MDXLayout>
  ) : (
    _createMdxContent(props)
  );
}
