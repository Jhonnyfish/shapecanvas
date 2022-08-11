import  {createRouter,createWebHistory} from 'vue-router'
import canvas from '../components/Canvas.vue'

const routes = [
    {
        path:"/",
        name:"canvas",
        component: canvas
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes : routes
})
export default router