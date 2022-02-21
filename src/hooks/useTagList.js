import { tagList } from '@/api/tag'
import { ref, onMounted } from 'vue'

export default function () {
    let taglist = ref([])
    const getTagList = async () => {
        const { data } = await tagList({
            current: 1,
            pageSize: 99
        })
        taglist.value = data.records
    }
    onMounted(() => {
        getTagList()
    })

    return taglist
}
