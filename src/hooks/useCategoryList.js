import { categoryList } from '@/api/category'
import { ref, onMounted } from 'vue'

export default function () {
    let categorylist = ref([])
    const getCategoryList = async () => {
        const { data } = await categoryList({
            current: 1,
            pageSize: 99
        })
        categorylist.value = data.records
    }
    onMounted(() => {
        getCategoryList()
    })

    return categorylist
}
