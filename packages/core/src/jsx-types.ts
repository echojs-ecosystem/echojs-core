// JSX Type Definitions for EchoJS
// Provides TypeScript support for JSX elements

export namespace JSX {
  // В EchoJS элементом JSX может быть не только DOM Node (например строки/числа/массивы),
  // поэтому привязываем JSX.Element к нашему внутреннему типу JSXElement.
  export type Element = import("./types.js").JSXElement;

  export interface IntrinsicElements {
    // HTML elements
    a: HTMLAnchorElementAttributes;
    abbr: HTMLElementAttributes;
    address: HTMLElementAttributes;
    area: HTMLAreaElementAttributes;
    article: HTMLElementAttributes;
    aside: HTMLElementAttributes;
    audio: HTMLAudioElementAttributes;
    b: HTMLElementAttributes;
    base: HTMLBaseElementAttributes;
    bdi: HTMLElementAttributes;
    bdo: HTMLElementAttributes;
    blockquote: HTMLQuoteElementAttributes;
    body: HTMLBodyElementAttributes;
    br: HTMLBRElementAttributes;
    button: HTMLButtonElementAttributes;
    canvas: HTMLCanvasElementAttributes;
    caption: HTMLElementAttributes;
    cite: HTMLElementAttributes;
    code: HTMLElementAttributes;
    col: HTMLTableColElementAttributes;
    colgroup: HTMLTableColElementAttributes;
    data: HTMLDataElementAttributes;
    datalist: HTMLElementAttributes;
    dd: HTMLElementAttributes;
    del: HTMLModElementAttributes;
    details: HTMLDetailsElementAttributes;
    dfn: HTMLElementAttributes;
    dialog: HTMLDialogElementAttributes;
    div: HTMLDivElementAttributes;
    dl: HTMLElementAttributes;
    dt: HTMLElementAttributes;
    em: HTMLElementAttributes;
    embed: HTMLEmbedElementAttributes;
    fieldset: HTMLFieldSetElementAttributes;
    figcaption: HTMLElementAttributes;
    figure: HTMLElementAttributes;
    footer: HTMLElementAttributes;
    form: HTMLFormElementAttributes;
    h1: HTMLHeadingElementAttributes;
    h2: HTMLHeadingElementAttributes;
    h3: HTMLHeadingElementAttributes;
    h4: HTMLHeadingElementAttributes;
    h5: HTMLHeadingElementAttributes;
    h6: HTMLHeadingElementAttributes;
    head: HTMLElementAttributes;
    header: HTMLElementAttributes;
    hgroup: HTMLElementAttributes;
    hr: HTMLHRElementAttributes;
    html: HTMLHtmlElementAttributes;
    i: HTMLElementAttributes;
    iframe: HTMLIFrameElementAttributes;
    img: HTMLImageElementAttributes;
    input: HTMLInputElementAttributes;
    ins: HTMLModElementAttributes;
    kbd: HTMLElementAttributes;
    label: HTMLLabelElementAttributes;
    legend: HTMLLegendElementAttributes;
    li: HTMLLIElementAttributes;
    link: HTMLLinkElementAttributes;
    main: HTMLElementAttributes;
    map: HTMLMapElementAttributes;
    mark: HTMLElementAttributes;
    menu: HTMLMenuElementAttributes;
    meta: HTMLMetaElementAttributes;
    meter: HTMLMeterElementAttributes;
    nav: HTMLElementAttributes;
    noscript: HTMLElementAttributes;
    object: HTMLObjectElementAttributes;
    ol: HTMLOListElementAttributes;
    optgroup: HTMLOptGroupElementAttributes;
    option: HTMLOptionElementAttributes;
    output: HTMLOutputElementAttributes;
    p: HTMLParagraphElementAttributes;
    picture: HTMLElementAttributes;
    pre: HTMLPreElementAttributes;
    progress: HTMLProgressElementAttributes;
    q: HTMLQuoteElementAttributes;
    rp: HTMLElementAttributes;
    rt: HTMLElementAttributes;
    ruby: HTMLElementAttributes;
    s: HTMLElementAttributes;
    samp: HTMLElementAttributes;
    script: HTMLScriptElementAttributes;
    search: HTMLElementAttributes;
    section: HTMLElementAttributes;
    select: HTMLSelectElementAttributes;
    slot: HTMLSlotElementAttributes;
    small: HTMLElementAttributes;
    source: HTMLSourceElementAttributes;
    span: HTMLSpanElementAttributes;
    strong: HTMLElementAttributes;
    style: HTMLStyleElementAttributes;
    sub: HTMLElementAttributes;
    summary: HTMLElementAttributes;
    sup: HTMLElementAttributes;
    table: HTMLTableElementAttributes;
    tbody: HTMLTableSectionElementAttributes;
    td: HTMLTableCellElementAttributes;
    template: HTMLTemplateElementAttributes;
    textarea: HTMLTextAreaElementAttributes;
    tfoot: HTMLTableSectionElementAttributes;
    th: HTMLTableCellElementAttributes;
    thead: HTMLTableSectionElementAttributes;
    time: HTMLTimeElementAttributes;
    title: HTMLTitleElementAttributes;
    tr: HTMLTableRowElementAttributes;
    track: HTMLTrackElementAttributes;
    u: HTMLElementAttributes;
    ul: HTMLUListElementAttributes;
    var: HTMLElementAttributes;
    video: HTMLVideoElementAttributes;
    wbr: HTMLElementAttributes;

    // SVG elements
    svg: SVGSVGElementAttributes;
    animate: SVGElementAttributes;
    animateMotion: SVGElementAttributes;
    animateTransform: SVGElementAttributes;
    circle: SVGCircleElementAttributes;
    clipPath: SVGClipPathElementAttributes;
    defs: SVGDefsElementAttributes;
    desc: SVGDescElementAttributes;
    ellipse: SVGEllipseElementAttributes;
    feBlend: SVGFEBlendElementAttributes;
    feColorMatrix: SVGFEColorMatrixElementAttributes;
    feComponentTransfer: SVGFEComponentTransferElementAttributes;
    feComposite: SVGFECompositeElementAttributes;
    feConvolveMatrix: SVGFEConvolveMatrixElementAttributes;
    feDiffuseLighting: SVGFEDiffuseLightingElementAttributes;
    feDisplacementMap: SVGFEDisplacementMapElementAttributes;
    feDistantLight: SVGFEDistantLightElementAttributes;
    feDropShadow: SVGFEDropShadowElementAttributes;
    feFlood: SVGFEFloodElementAttributes;
    feFuncA: SVGFEFuncAElementAttributes;
    feFuncB: SVGFEFuncBElementAttributes;
    feFuncG: SVGFEFuncGElementAttributes;
    feFuncR: SVGFEFuncRElementAttributes;
    feGaussianBlur: SVGFEGaussianBlurElementAttributes;
    feImage: SVGFEImageElementAttributes;
    feMerge: SVGFEMergeElementAttributes;
    feMergeNode: SVGFEMergeNodeElementAttributes;
    feMorphology: SVGFEMorphologyElementAttributes;
    feOffset: SVGFEOffsetElementAttributes;
    fePointLight: SVGFEPointLightElementAttributes;
    feSpecularLighting: SVGFESpecularLightingElementAttributes;
    feSpotLight: SVGFESpotLightElementAttributes;
    feTile: SVGFETileElementAttributes;
    feTurbulence: SVGFETurbulenceElementAttributes;
    filter: SVGFilterElementAttributes;
    foreignObject: SVGForeignObjectElementAttributes;
    g: SVGGElementAttributes;
    image: SVGImageElementAttributes;
    line: SVGLineElementAttributes;
    linearGradient: SVGLinearGradientElementAttributes;
    marker: SVGMarkerElementAttributes;
    mask: SVGMaskElementAttributes;
    metadata: SVGMetadataElementAttributes;
    mpath: SVGMPathElementAttributes;
    path: SVGPathElementAttributes;
    pattern: SVGPatternElementAttributes;
    polygon: SVGPolygonElementAttributes;
    polyline: SVGPolylineElementAttributes;
    radialGradient: SVGRadialGradientElementAttributes;
    rect: SVGRectElementAttributes;
    set: SVGSetElementAttributes;
    stop: SVGStopElementAttributes;
    switch: SVGSwitchElementAttributes;
    symbol: SVGSymbolElementAttributes;
    text: SVGTextElementAttributes;
    textPath: SVGTextPathElementAttributes;
    // title is defined in HTML elements
    tspan: SVGTSpanElementAttributes;
    use: SVGUseElementAttributes;
    view: SVGViewElementAttributes;
  }

  // Base attributes interface with EchoJS-specific directives
  interface BaseAttributes {
    children?: import("./types.js").JSXElement;
    key?: string | number;
    // EchoJS directives
    if?: import("./types.js").Signalish<boolean>;
    show?: import("./types.js").Signalish<boolean>;
    else?: boolean;
    "else-if"?: import("./types.js").Signalish<boolean>;
  }

  // HTML Element Attributes
  interface HTMLElementAttributes extends BaseAttributes {
    accesskey?: string;
    autocapitalize?: string;
    autofocus?: boolean;
    class?: import("./types.js").Signalish<string>;
    contenteditable?: boolean | "inherit";
    contextmenu?: string;
    dir?: string;
    draggable?: boolean;
    hidden?: boolean;
    id?: string;
    itemprop?: string;
    itemscope?: boolean;
    itemtype?: string;
    lang?: string;
    role?: string;
    slot?: string;
    spellcheck?: boolean;
    style?: import("./types.js").Signalish<string | Record<string, string | number>>;
    tabindex?: number;
    title?: string;
    translate?: "yes" | "no";
    // Event handlers (lowercase and camelCase)
    onclick?: import("./types.js").EventHandler;
    onClick?: import("./types.js").EventHandler;
    ondblclick?: import("./types.js").EventHandler;
    onDblClick?: import("./types.js").EventHandler;
    onmousedown?: import("./types.js").EventHandler;
    onMouseDown?: import("./types.js").EventHandler;
    onmouseup?: import("./types.js").EventHandler;
    onMouseUp?: import("./types.js").EventHandler;
    onmouseover?: import("./types.js").EventHandler;
    onMouseOver?: import("./types.js").EventHandler;
    onmousemove?: import("./types.js").EventHandler;
    onMouseMove?: import("./types.js").EventHandler;
    onmouseout?: import("./types.js").EventHandler;
    onMouseOut?: import("./types.js").EventHandler;
    onmouseenter?: import("./types.js").EventHandler;
    onMouseEnter?: import("./types.js").EventHandler;
    onmouseleave?: import("./types.js").EventHandler;
    onMouseLeave?: import("./types.js").EventHandler;
    onkeydown?: import("./types.js").EventHandler;
    onKeyDown?: import("./types.js").EventHandler;
    onkeyup?: import("./types.js").EventHandler;
    onKeyUp?: import("./types.js").EventHandler;
    onkeypress?: import("./types.js").EventHandler;
    onKeyPress?: import("./types.js").EventHandler;
    onfocus?: import("./types.js").EventHandler;
    onFocus?: import("./types.js").EventHandler;
    onblur?: import("./types.js").EventHandler;
    onBlur?: import("./types.js").EventHandler;
    onchange?: import("./types.js").EventHandler;
    onChange?: import("./types.js").EventHandler;
    oninput?: import("./types.js").EventHandler;
    onInput?: import("./types.js").EventHandler;
    onsubmit?: import("./types.js").EventHandler;
    onSubmit?: import("./types.js").EventHandler;
    onreset?: import("./types.js").EventHandler;
    onReset?: import("./types.js").EventHandler;
    onselect?: import("./types.js").EventHandler;
    onSelect?: import("./types.js").EventHandler;
    onload?: import("./types.js").EventHandler;
    onLoad?: import("./types.js").EventHandler;
    onunload?: import("./types.js").EventHandler;
    onUnload?: import("./types.js").EventHandler;
    onerror?: import("./types.js").EventHandler;
    onError?: import("./types.js").EventHandler;
    onresize?: import("./types.js").EventHandler;
    onResize?: import("./types.js").EventHandler;
    onscroll?: import("./types.js").EventHandler;
    onScroll?: import("./types.js").EventHandler;
    // EchoJS event syntax
    "on:click"?: import("./types.js").EventHandler;
    "on:dblclick"?: import("./types.js").EventHandler;
    "on:mousedown"?: import("./types.js").EventHandler;
    "on:mouseup"?: import("./types.js").EventHandler;
    "on:mouseover"?: import("./types.js").EventHandler;
    "on:mousemove"?: import("./types.js").EventHandler;
    "on:mouseout"?: import("./types.js").EventHandler;
    "on:mouseenter"?: import("./types.js").EventHandler;
    "on:mouseleave"?: import("./types.js").EventHandler;
    "on:keydown"?: import("./types.js").EventHandler;
    "on:keyup"?: import("./types.js").EventHandler;
    "on:keypress"?: import("./types.js").EventHandler;
    "on:focus"?: import("./types.js").EventHandler;
    "on:blur"?: import("./types.js").EventHandler;
    "on:change"?: import("./types.js").EventHandler;
    "on:input"?: import("./types.js").EventHandler;
    "on:submit"?: import("./types.js").EventHandler;
    "on:reset"?: import("./types.js").EventHandler;
    "on:select"?: import("./types.js").EventHandler;
    "on:load"?: import("./types.js").EventHandler;
    "on:unload"?: import("./types.js").EventHandler;
    "on:error"?: import("./types.js").EventHandler;
    "on:resize"?: import("./types.js").EventHandler;
    "on:scroll"?: import("./types.js").EventHandler;
    // Event modifiers
    "on:click:prevent"?: import("./types.js").EventHandler;
    "on:click:stop"?: import("./types.js").EventHandler;
    "on:click:capture"?: import("./types.js").EventHandler;
    "on:click:once"?: import("./types.js").EventHandler;
    "on:click:self"?: import("./types.js").EventHandler;
    "on:click:prevent:stop"?: import("./types.js").EventHandler;
    "on:submit:prevent"?: import("./types.js").EventHandler;
    "on:input:prevent"?: import("./types.js").EventHandler;
    // Data attributes
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    // ARIA attributes
    [ariaAttribute: `aria-${string}`]: string | number | boolean | undefined;
  }

  // Specific element attributes
  interface HTMLAnchorElementAttributes extends HTMLElementAttributes {
    download?: string;
    href?: string;
    hreflang?: string;
    media?: string;
    ping?: string;
    referrerpolicy?: string;
    rel?: string;
    target?: string;
    type?: string;
  }

  interface HTMLAreaElementAttributes extends HTMLElementAttributes {
    alt?: string;
    coords?: string;
    download?: string;
    href?: string;
    hreflang?: string;
    media?: string;
    referrerpolicy?: string;
    rel?: string;
    shape?: string;
    target?: string;
  }

  interface HTMLAudioElementAttributes extends HTMLMediaElementAttributes {}

  interface HTMLBaseElementAttributes extends HTMLElementAttributes {
    href?: string;
    target?: string;
  }

  interface HTMLBodyElementAttributes extends HTMLElementAttributes {
    onafterprint?: import("./types.js").EventHandler;
    onbeforeprint?: import("./types.js").EventHandler;
    onbeforeunload?: import("./types.js").EventHandler;
    onhashchange?: import("./types.js").EventHandler;
    onlanguagechange?: import("./types.js").EventHandler;
    onmessage?: import("./types.js").EventHandler;
    onoffline?: import("./types.js").EventHandler;
    ononline?: import("./types.js").EventHandler;
    onpageshow?: import("./types.js").EventHandler;
    onpopstate?: import("./types.js").EventHandler;
    onstorage?: import("./types.js").EventHandler;
  }

  interface HTMLBRElementAttributes extends HTMLElementAttributes {
    clear?: string;
  }

  interface HTMLButtonElementAttributes extends HTMLElementAttributes {
    autofocus?: boolean;
    disabled?: boolean;
    form?: string;
    formaction?: string;
    formenctype?: string;
    formmethod?: string;
    formnovalidate?: boolean;
    formtarget?: string;
    name?: string;
    type?: "submit" | "reset" | "button";
    value?: string | number;
  }

  interface HTMLCanvasElementAttributes extends HTMLElementAttributes {
    height?: number | string;
    width?: number | string;
  }

  interface HTMLDataElementAttributes extends HTMLElementAttributes {
    value?: string;
  }

  interface HTMLDetailsElementAttributes extends HTMLElementAttributes {
    open?: boolean;
  }

  interface HTMLDialogElementAttributes extends HTMLElementAttributes {
    open?: boolean;
    returnvalue?: string;
  }

  interface HTMLDivElementAttributes extends HTMLElementAttributes {
    align?: string;
  }

  interface HTMLEmbedElementAttributes extends HTMLElementAttributes {
    height?: number | string;
    src?: string;
    type?: string;
    width?: number | string;
  }

  interface HTMLFieldSetElementAttributes extends HTMLElementAttributes {
    disabled?: boolean;
    form?: string;
    name?: string;
  }

  interface HTMLFormElementAttributes extends HTMLElementAttributes {
    acceptcharset?: string;
    action?: string;
    autocomplete?: string;
    enctype?: string;
    method?: string;
    name?: string;
    novalidate?: boolean;
    target?: string;
    onsubmit?: import("./types.js").EventHandler;
    "on:submit"?: import("./types.js").EventHandler;
    "on:submit:prevent"?: import("./types.js").EventHandler;
  }

  interface HTMLHeadingElementAttributes extends HTMLElementAttributes {
    align?: string;
  }

  interface HTMLHRElementAttributes extends HTMLElementAttributes {
    align?: string;
    color?: string;
    noshade?: boolean;
    size?: string;
    width?: string;
  }

  interface HTMLHtmlElementAttributes extends HTMLElementAttributes {
    manifest?: string;
    xmlns?: string;
  }

  interface HTMLIFrameElementAttributes extends HTMLElementAttributes {
    allow?: string;
    csp?: string;
    height?: number | string;
    loading?: "eager" | "lazy";
    name?: string;
    referrerpolicy?: string;
    sandbox?: string;
    src?: string;
    srcdoc?: string;
    width?: number | string;
  }

  interface HTMLImageElementAttributes extends HTMLElementAttributes {
    alt?: string;
    crossorigin?: "anonymous" | "use-credentials";
    decoding?: "sync" | "async" | "auto";
    height?: number | string;
    ismap?: boolean;
    loading?: "eager" | "lazy";
    referrerpolicy?: string;
    sizes?: string;
    src?: string;
    srcset?: string;
    usemap?: string;
    width?: number | string;
  }

  interface HTMLInputElementAttributes extends HTMLElementAttributes {
    accept?: string;
    alt?: string;
    autocomplete?: string;
    autofocus?: boolean;
    capture?: boolean | string;
    checked?: import("./types.js").Signalish<boolean>;
    crossorigin?: string;
    dirname?: string;
    disabled?: boolean;
    form?: string;
    formaction?: string;
    formenctype?: string;
    formmethod?: string;
    formnovalidate?: boolean;
    formtarget?: string;
    height?: number | string;
    list?: string;
    max?: number | string;
    maxlength?: number;
    min?: number | string;
    minlength?: number;
    multiple?: boolean;
    name?: string;
    pattern?: string;
    placeholder?: string;
    popovertarget?: string;
    popovertargetaction?: string;
    readonly?: boolean;
    required?: boolean;
    size?: number;
    src?: string;
    step?: number | string;
    type?: string;
    value?: import("./types.js").Signalish<string | number | readonly string[]>;
    width?: number | string;
    oninput?: import("./types.js").EventHandler;
    onchange?: import("./types.js").EventHandler;
    "on:input"?: import("./types.js").EventHandler;
    "on:change"?: import("./types.js").EventHandler;
  }

  interface HTMLLabelElementAttributes extends HTMLElementAttributes {
    form?: string;
    for?: string;
    htmlfor?: string;
  }

  interface HTMLLegendElementAttributes extends HTMLElementAttributes {
    align?: string;
  }

  interface HTMLLIElementAttributes extends HTMLElementAttributes {
    value?: number;
  }

  interface HTMLLinkElementAttributes extends HTMLElementAttributes {
    as?: string;
    crossorigin?: string;
    disabled?: boolean;
    href?: string;
    hreflang?: string;
    imagesizes?: string;
    imagesrcset?: string;
    integrity?: string;
    media?: string;
    referrerpolicy?: string;
    rel?: string;
    sizes?: string;
    type?: string;
  }

  interface HTMLMapElementAttributes extends HTMLElementAttributes {
    name?: string;
  }

  interface HTMLMediaElementAttributes extends HTMLElementAttributes {
    autoplay?: boolean;
    controls?: boolean;
    crossorigin?: string;
    disableremoteplayback?: boolean;
    loop?: boolean;
    muted?: boolean;
    preload?: string;
    src?: string;
  }

  interface HTMLMenuElementAttributes extends HTMLElementAttributes {
    type?: string;
  }

  interface HTMLMetaElementAttributes extends HTMLElementAttributes {
    charset?: string;
    content?: string;
    "http-equiv"?: string;
    name?: string;
  }

  interface HTMLMeterElementAttributes extends HTMLElementAttributes {
    high?: number;
    low?: number;
    max?: number;
    min?: number;
    optimum?: number;
    value?: number;
  }

  interface HTMLModElementAttributes extends HTMLElementAttributes {
    cite?: string;
    datetime?: string;
  }

  interface HTMLObjectElementAttributes extends HTMLElementAttributes {
    data?: string;
    form?: string;
    height?: number | string;
    name?: string;
    type?: string;
    usemap?: string;
    width?: number | string;
  }

  interface HTMLOListElementAttributes extends HTMLElementAttributes {
    reversed?: boolean;
    start?: number;
    type?: string;
  }

  interface HTMLOptGroupElementAttributes extends HTMLElementAttributes {
    disabled?: boolean;
    label?: string;
  }

  interface HTMLOptionElementAttributes extends HTMLElementAttributes {
    disabled?: boolean;
    label?: string;
    selected?: boolean;
    value?: string;
  }

  interface HTMLOutputElementAttributes extends HTMLElementAttributes {
    for?: string;
    form?: string;
    name?: string;
  }

  interface HTMLParagraphElementAttributes extends HTMLElementAttributes {
    align?: string;
  }

  interface HTMLPreElementAttributes extends HTMLElementAttributes {
    cols?: number;
    width?: number;
    wrap?: string;
  }

  interface HTMLProgressElementAttributes extends HTMLElementAttributes {
    max?: number;
    value?: number;
  }

  interface HTMLQuoteElementAttributes extends HTMLElementAttributes {
    cite?: string;
  }

  interface HTMLScriptElementAttributes extends HTMLElementAttributes {
    async?: boolean;
    crossorigin?: string;
    defer?: boolean;
    fetchpriority?: string;
    integrity?: string;
    nomodule?: boolean;
    referrerpolicy?: string;
    src?: string;
    type?: string;
  }

  interface HTMLSelectElementAttributes extends HTMLElementAttributes {
    autocomplete?: string;
    autofocus?: boolean;
    disabled?: boolean;
    form?: string;
    multiple?: boolean;
    name?: string;
    required?: boolean;
    size?: number;
    onchange?: import("./types.js").EventHandler;
    "on:change"?: import("./types.js").EventHandler;
  }

  interface HTMLSlotElementAttributes extends HTMLElementAttributes {
    name?: string;
  }

  interface HTMLSourceElementAttributes extends HTMLElementAttributes {
    height?: number | string;
    media?: string;
    sizes?: string;
    src?: string;
    srcset?: string;
    type?: string;
    width?: number | string;
  }

  interface HTMLSpanElementAttributes extends HTMLElementAttributes {}

  interface HTMLStyleElementAttributes extends HTMLElementAttributes {
    disabled?: boolean;
    media?: string;
    type?: string;
  }

  interface HTMLTableElementAttributes extends HTMLElementAttributes {
    align?: string;
    bgcolor?: string;
    border?: string;
    cellpadding?: number | string;
    cellspacing?: number | string;
    frame?: string;
    rules?: string;
    summary?: string;
    width?: string;
  }

  interface HTMLTableCellElementAttributes extends HTMLElementAttributes {
    abbr?: string;
    align?: string;
    colspan?: number | string;
    headers?: string;
    height?: number | string;
    rowspan?: number | string;
    scope?: string;
    valign?: string;
    width?: number | string;
  }

  interface HTMLTableColElementAttributes extends HTMLElementAttributes {
    align?: string;
    char?: string;
    charoff?: string;
    span?: number | string;
    valign?: string;
    width?: number | string;
  }

  interface HTMLTableRowElementAttributes extends HTMLElementAttributes {
    align?: string;
    bgcolor?: string;
    char?: string;
    charoff?: string;
    valign?: string;
  }

  interface HTMLTableSectionElementAttributes extends HTMLElementAttributes {
    align?: string;
    char?: string;
    charoff?: string;
    valign?: string;
  }

  interface HTMLTemplateElementAttributes extends HTMLElementAttributes {
    shadowrootmode?: "open" | "closed";
    shadowrootdelegatesfocus?: boolean;
  }

  interface HTMLTextAreaElementAttributes extends HTMLElementAttributes {
    autocomplete?: string;
    autocorrect?: string;
    autofocus?: boolean;
    cols?: number;
    dirname?: string;
    disabled?: boolean;
    form?: string;
    maxlength?: number;
    minlength?: number;
    name?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    rows?: number;
    value?: import("./types.js").Signalish<string | number | readonly string[]>;
    wrap?: string;
    oninput?: import("./types.js").EventHandler;
    onchange?: import("./types.js").EventHandler;
    "on:input"?: import("./types.js").EventHandler;
    "on:change"?: import("./types.js").EventHandler;
  }

  interface HTMLTimeElementAttributes extends HTMLElementAttributes {
    datetime?: string;
  }

  interface HTMLTitleElementAttributes extends HTMLElementAttributes {}

  interface HTMLTrackElementAttributes extends HTMLElementAttributes {
    default?: boolean;
    kind?: string;
    label?: string;
    src?: string;
    srclang?: string;
  }

  interface HTMLUListElementAttributes extends HTMLElementAttributes {
    type?: string;
  }

  interface HTMLVideoElementAttributes extends HTMLMediaElementAttributes {
    height?: number | string;
    playsinline?: boolean;
    poster?: string;
    width?: number | string;
  }

  // SVG Element Attributes
  interface SVGElementAttributes extends BaseAttributes {
    class?: import("./types.js").Signalish<string>;
    style?: import("./types.js").Signalish<string | Record<string, string | number>>;
    id?: string;
  }

  interface SVGSVGElementAttributes extends SVGElementAttributes {
    height?: number | string;
    preserveaspectratio?: string;
    viewbox?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
    xmlns?: string;
  }

  interface SVGCircleElementAttributes extends SVGElementAttributes {
    cx?: number | string;
    cy?: number | string;
    pathlength?: number | string;
    r?: number | string;
  }

  interface SVGClipPathElementAttributes extends SVGElementAttributes {
    clippathunits?: string;
  }

  interface SVGDefsElementAttributes extends SVGElementAttributes {}
  interface SVGDescElementAttributes extends SVGElementAttributes {}

  interface SVGEllipseElementAttributes extends SVGElementAttributes {
    cx?: number | string;
    cy?: number | string;
    pathlength?: number | string;
    rx?: number | string;
    ry?: number | string;
  }

  interface SVGFEBlendElementAttributes extends SVGElementAttributes {
    in?: string;
    in2?: string;
    mode?: string;
  }

  interface SVGFEColorMatrixElementAttributes extends SVGElementAttributes {
    in?: string;
    type?: string;
    values?: string;
  }

  interface SVGFEComponentTransferElementAttributes extends SVGElementAttributes {
    in?: string;
  }

  interface SVGFECompositeElementAttributes extends SVGElementAttributes {
    in?: string;
    in2?: string;
    k1?: number | string;
    k2?: number | string;
    k3?: number | string;
    k4?: number | string;
    operator?: string;
  }

  interface SVGFEConvolveMatrixElementAttributes extends SVGElementAttributes {
    bias?: number | string;
    divisor?: number | string;
    in?: string;
    kernelmatrix?: string;
    kernelunitlength?: number | string;
    order?: number | string;
    preservealpha?: boolean;
    targetx?: number | string;
    targety?: number | string;
  }

  interface SVGFEDiffuseLightingElementAttributes extends SVGElementAttributes {
    diffuseconstant?: number | string;
    in?: string;
    kernelunitlength?: number | string;
    lightingcolor?: string;
    surfaceScale?: number | string;
  }

  interface SVGFEDisplacementMapElementAttributes extends SVGElementAttributes {
    in?: string;
    in2?: string;
    scale?: number | string;
    xchannelselector?: string;
    ychannelselector?: string;
  }

  interface SVGFEDistantLightElementAttributes extends SVGElementAttributes {
    azimuth?: number | string;
    elevation?: number | string;
  }

  interface SVGFEDropShadowElementAttributes extends SVGElementAttributes {
    dx?: number | string;
    dy?: number | string;
    in?: string;
    stddeviation?: number | string;
  }

  interface SVGFEFloodElementAttributes extends SVGElementAttributes {
    floodcolor?: string;
    floodopacity?: number | string;
  }

  interface SVGFEFuncAElementAttributes extends SVGElementAttributes {
    amplitude?: number | string;
    exponent?: number | string;
    intercept?: number | string;
    offset?: number | string;
    slope?: number | string;
    tablevalues?: string;
    type?: string;
  }

  interface SVGFEFuncBElementAttributes extends SVGFEFuncAElementAttributes {}
  interface SVGFEFuncGElementAttributes extends SVGFEFuncAElementAttributes {}
  interface SVGFEFuncRElementAttributes extends SVGFEFuncAElementAttributes {}

  interface SVGFEGaussianBlurElementAttributes extends SVGElementAttributes {
    in?: string;
    stddeviation?: number | string;
  }

  interface SVGFEImageElementAttributes extends SVGElementAttributes {
    crossorigin?: string;
    href?: string;
    preserveaspectratio?: string;
  }

  interface SVGFEMergeElementAttributes extends SVGElementAttributes {}
  interface SVGFEMergeNodeElementAttributes extends SVGElementAttributes {
    in?: string;
  }

  interface SVGFEMorphologyElementAttributes extends SVGElementAttributes {
    in?: string;
    operator?: string;
    radius?: number | string;
  }

  interface SVGFEOffsetElementAttributes extends SVGElementAttributes {
    dx?: number | string;
    dy?: number | string;
    in?: string;
  }

  interface SVGFEPointLightElementAttributes extends SVGElementAttributes {
    x?: number | string;
    y?: number | string;
    z?: number | string;
  }

  interface SVGFESpecularLightingElementAttributes extends SVGElementAttributes {
    in?: string;
    kernelunitlength?: number | string;
    lightingcolor?: string;
    specularconstant?: number | string;
    specularexponent?: number | string;
    surfaceScale?: number | string;
  }

  interface SVGFESpotLightElementAttributes extends SVGElementAttributes {
    limitingconeangle?: number | string;
    pointsatx?: number | string;
    pointsaty?: number | string;
    pointsatz?: number | string;
    specularexponent?: number | string;
    x?: number | string;
    y?: number | string;
    z?: number | string;
  }

  interface SVGFETileElementAttributes extends SVGElementAttributes {
    in?: string;
  }

  interface SVGFETurbulenceElementAttributes extends SVGElementAttributes {
    basefrequency?: number | string;
    numoctaves?: number | string;
    seed?: number | string;
    stitchtiles?: string;
    type?: string;
  }

  interface SVGFilterElementAttributes extends SVGElementAttributes {
    filterunits?: string;
    height?: number | string;
    primitiveunits?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
  }

  interface SVGForeignObjectElementAttributes extends SVGElementAttributes {
    height?: number | string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
  }

  interface SVGGElementAttributes extends SVGElementAttributes {}

  interface SVGImageElementAttributes extends SVGElementAttributes {
    crossorigin?: string;
    height?: number | string;
    href?: string;
    preserveaspectratio?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
  }

  interface SVGLineElementAttributes extends SVGElementAttributes {
    pathlength?: number | string;
    x1?: number | string;
    x2?: number | string;
    y1?: number | string;
    y2?: number | string;
  }

  interface SVGLinearGradientElementAttributes extends SVGElementAttributes {
    gradienttransform?: string;
    gradientunits?: string;
    spreadmethod?: string;
    x1?: number | string;
    x2?: number | string;
    y1?: number | string;
    y2?: number | string;
  }

  interface SVGMarkerElementAttributes extends SVGElementAttributes {
    markerheight?: number | string;
    markerunits?: string;
    markerwidth?: number | string;
    orient?: string;
    preserveaspectratio?: string;
    refx?: number | string;
    refy?: number | string;
  }

  interface SVGMaskElementAttributes extends SVGElementAttributes {
    height?: number | string;
    maskcontentunits?: string;
    maskunits?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
  }

  interface SVGMetadataElementAttributes extends SVGElementAttributes {}
  interface SVGMPathElementAttributes extends SVGElementAttributes {
    href?: string;
  }

  interface SVGPathElementAttributes extends SVGElementAttributes {
    d?: string;
    pathlength?: number | string;
  }

  interface SVGPatternElementAttributes extends SVGElementAttributes {
    height?: number | string;
    patterncontentunits?: string;
    patterntransform?: string;
    patternunits?: string;
    preserveaspectratio?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
  }

  interface SVGPolygonElementAttributes extends SVGElementAttributes {
    pathlength?: number | string;
    points?: string;
  }

  interface SVGPolylineElementAttributes extends SVGElementAttributes {
    pathlength?: number | string;
    points?: string;
  }

  interface SVGRadialGradientElementAttributes extends SVGElementAttributes {
    cx?: number | string;
    cy?: number | string;
    fr?: number | string;
    fx?: number | string;
    fy?: number | string;
    gradienttransform?: string;
    gradientunits?: string;
    r?: number | string;
    spreadmethod?: string;
  }

  interface SVGRectElementAttributes extends SVGElementAttributes {
    height?: number | string;
    pathlength?: number | string;
    rx?: number | string;
    ry?: number | string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
  }

  interface SVGSetElementAttributes extends SVGElementAttributes {
    attributeName?: string;
    to?: string;
  }

  interface SVGStopElementAttributes extends SVGElementAttributes {
    offset?: number | string;
    stopcolor?: string;
    stopopacity?: number | string;
  }

  interface SVGSwitchElementAttributes extends SVGElementAttributes {}

  interface SVGSymbolElementAttributes extends SVGElementAttributes {
    preserveaspectratio?: string;
    refx?: number | string;
    refy?: number | string;
    viewbox?: string;
  }

  interface SVGTextElementAttributes extends SVGElementAttributes {
    dx?: number | string;
    dy?: number | string;
    lengthadjust?: string;
    textlength?: number | string;
    x?: number | string;
    y?: number | string;
  }

  interface SVGTextPathElementAttributes extends SVGElementAttributes {
    href?: string;
    lengthadjust?: string;
    method?: string;
    spacing?: string;
    startoffset?: number | string;
    textlength?: number | string;
  }

  interface SVGTitleElementAttributes extends SVGElementAttributes {}

  interface SVGTSpanElementAttributes extends SVGElementAttributes {
    dx?: number | string;
    dy?: number | string;
    lengthadjust?: string;
    textlength?: number | string;
    x?: number | string;
    y?: number | string;
  }

  interface SVGUseElementAttributes extends SVGElementAttributes {
    height?: number | string;
    href?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
  }

  interface SVGViewElementAttributes extends SVGElementAttributes {
    preserveaspectratio?: string;
    viewbox?: string;
  }
}
