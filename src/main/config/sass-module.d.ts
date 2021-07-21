// hack p/ entender as extenções do scss como classes
declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}
