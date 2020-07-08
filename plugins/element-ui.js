import Vue from 'vue'
import Element from 'element-ui'
import VueParticles from 'vue-particles'
import Markdown from 'vue-markdown'
import leMarkdownEditor from 'le-markdown-editor'
import Markmeditor from 'vue-meditor'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Element, { locale })
Vue.use(Markdown)
Vue.use(Markmeditor)
Vue.use(VueParticles)
Vue.use(leMarkdownEditor)
