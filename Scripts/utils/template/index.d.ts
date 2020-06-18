//lib.d.ts 并未提供IE8的 attachEvent和 detachEvent 方法
interface IE8HTMLInputElement extends HTMLInputElement {
    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): boolean;
}




declare var fx : {
    /**
     * 绑定方法
     * @param {Element} obj 绑定的元素
     * @param {String} type 方法名称
     * @param {function} fn  绑定的方法
     */
    addEvent(obj:any, type:string, fn:any) : void

    /**
     * 解除方法绑定
     * @param {Element} obj 解除方法绑定的元素
     * @param {String} type 方法名称
     * @param {function} fn  解除方法绑定的方法
     */
    removeEvent(obj:IE8HTMLInputElement, type:string, fn:any) : void

    /**
     * 是否是ipad
     *
     * @type {Boolean}
     */

    IS_IPAD:boolean

    /**
     * 是否是iPhone
     *
     * @type {Boolean}
     */

    IS_IPHONE:boolean

    /**
     * 是否是iPod
     *
     * @type {Boolean}
     */

    IS_IPOD:boolean

    /**
     * 是否是ios
     *
     * @type {Boolean}
     */

    IS_IOS:boolean

    /**
     * 是否是android
     *
     * @type {Boolean}
     */

    IS_ANDROID:boolean

    /**
     * 是否是火狐浏览器
     *
     * @return {Boolean}
     */
    IS_FIREFOX:boolean

    /**
     * 是否是Edge
     *
     * @return {Boolean}
     */
    IS_EDGE:boolean

    /**
     * 是否是Chrome
     *
     * @return {Boolean}
     */
    IS_CHROME:boolean

    /**
     * 是否是ios下的Safari
     *
     * @return {Boolean}
     */
    IS_IOS_SAFARI:boolean

    /**
     * 是否是Safari
     *
     * @return {Boolean}
     */
    IS_SAFARI:boolean
    /**
     * ios的版本号 没有则返回null
     *
     * @return {string|null}
     */
    IOS_VERSION:string|null

    /**
     * android的版本号 没有则返回null
     *
     * @return {number|string|null}
     */
    ANDROID_VERSION:number|string|null

    /**
     * 这是否是本机Android浏览器
     *
     * @return {Boolean}
     */
    IS_NATIVE_ANDROID:boolean

    /**
     * Chrome的版本号 没有则返回null
     *
     * @return {number|string|null}
     */
    CHROME_VERSION:number|string|null

    /**
     * IE的版本号 没有则返回-1
     *
     * @return {Number|String|null}
    -1 不是ie浏览器 Number
    6/7/8/9/10/11 浏览器的版本 Number
    'edge'  ie的edge浏览器 String
    */
    IE_VERSION:number|string|null

    /**
     * 获取元素样式表里面的样式
     * @param {Element} el 获取样式的元素
     * @param {string} prop 样式的名称
     * @return {String | Number}
     */
    computedStyle(el,prop:string):string | number

    /**
     * 是否是元素
     * @param {String} value 元素
     * @return {boolean}
     */
    isEl(value:string):boolean

    /**
     * 判断是否是文本
     * @param {String} value 内容
     * @return {boolean}
     */
    isTextNode(value:string):boolean

    /**
     * 传一个元素
     * @param {String} tagName 标签
     * @param properties 标签里面的文本内容
    {
    className: 'vjs-seek-to-live-text',
    innerHTML: this.localize('LIVE')
    }
    * @param {Object} attributes  添加属性
    * @param {Array<Element> | Element} content 标签里面添加元素
    * @return {Element} 返回添加的元素
    */
    createEl(tagName:string, properties?:object, attributes?:object, content?:Array<Element>|Element):Element

    /**
     * 添加文本内容的兼容处理
     * @param {Element} el 需要添加文本的元素 
     * @param {String} text 添加的文本 
     * @return {Element} 元素
     */
    textContent(el:Element,text:string):Element

    /**
     * 添加元素
     * @param {Element} el 父元素
     * @param {Array<Element> | Element} content 添加的元素 
     * @return {Element} 父元素
     */
    appendContent(el:Element,content:Array<Element> | Element):Element

    /**
     * 这是一个混合值，描述要注入到DOM中的内容
     * 通过某种方法。它可以是以下类型:
     * 输入     | 描述
     * string   | 值将被规范化为一个文本节点。
     * Element  | 值将按原样接受。
     * TextNode | 值将按原样接受。
     * Array    | 一维数组，包含字符串、元素、文本节点或函数。这些函数应该返回字符串、元素或文本节点(任何其他返回值，如数组，都将被忽略)。
     * Function |一个函数，它期望返回一个字符串、元素、文本节点或数组——上面描述的任何其他可能的值。这意味着内容描述符可以是返回函数数组的函数，但是这些二级函数必须返回字符串、元素或文本节点
     * 
     * 规范化最终插入到DOM中的内容
     * 这允许广泛的内容定义方法，但有助于保护
     * 避免陷入简单编写“innerHTML”的陷阱，这是可能的成为XSS关注的对象。
     *
     * 元素的内容可以以多种类型传递
     * 组合，其行为如下:
     * @param {module:dom~ContentDescriptor} content
     * @return {Array}
     */
    normalizeContent(content:any):Array<Node>

    /**
     * 是否是object类型
     * @return {boolean}
     */
    isObject(value:any):boolean

    /**
     * 判断是否是数组对象类型
     * @param value 值
     */
    isPlain(value:any):boolean

    /**
     * 对象的循环
     * @param object 需要解析循环的对象
     * @param fn(value,key) 执行的方法
            @param value 当前对象的值
            @param key 当前对象的下标
     */
    each(object:object,fn:any)

    /**
     * xhr请求
     * GET
     * DELETE
     * POST {hreaders:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
     * POSTBODY {headers:{'Content-Type': 'application/json; charset=UTF-8'}}
     */
    http:xhr

    /**
     * 动态安装 发布-订阅功能
     * @return events
            @param clientList 订阅缓存
            @param listen(订阅名称,订阅的函数)
            @param arg(函数的参数)
     */
    installEvents():events

    /**
     * 输出
     * @param value 输出的内容
     */
    log(value:any)

    /**
     * 弹窗
     * @param value 弹窗的内容
     */
    popup(value:any)
}

interface events{
    clientList:object
    listen(key:string,fn)
    trigger(key,...arg)
    remove(key,fn)
}

interface xhr {
    get(data:xhrModel) : void
    post(data:xhrModel) : void
    delete(data:xhrModel) : void
    postbody(data:xhrModel) : void
}

interface xhrModel {
    url:string
    type:string
    dataType?:string 
    data?:object 
    headers?:object 
    success:any 
    beforeSend?:any
    complete?:any
    error:any
}