export default {
    install: function (app: any) {
        app.directive('permission', {
            mounted: (el: any, binding: any, vnode: any) => {

            }
        })
        /**
         * @description: 表单防止重复提交指令
         * @param {*}
         * @return {*}
         * @author: 
         */
        app.directive('repeat', {
            mounted(el: any, binding: any) {
                el.addEventListener('click', () => {
                    if (!el.disabled) {
                        el.disabled = true
                        setTimeout(() => {
                            el.disabled = false
                        }, binding.value || 2000)
                    }
                })
            }
        })
    }
}
