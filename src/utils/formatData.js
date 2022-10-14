import { questionType, difficulty, chkType, publishType } from '@/api/hmmm/constants'
import { parseTime } from '@/utils'
// 格式化表格数据
export const formatData = function (data) {
  data.forEach(item => {
    const questionTypeRes = questionType.find(res => res.value.toString() === item.questionType)
    item.questionType = questionTypeRes ? questionTypeRes.label : ''
    const difficultyRes = difficulty.find(res => res.value.toString() === item.difficulty)
    item.difficulty = difficultyRes ? difficultyRes.label : ''
    item.addDate = parseTime(item.addDate)
    if (item.chkState !== undefined) {
      const chkStateRes = chkType.find(res => {
        if (item.chkState === 0) {
          return res.value === 1
        } else if (item.chkState === 1) {
          return res.value === 2
        } else {
          return res.value === 3
        }
      })
      item.chkState = chkStateRes ? chkStateRes.label : ''
    }
    if (item.publishState !== undefined) {
      const publishStateRes = publishType.find(res => {
        if (item.publishState === 0) {
          return res.value === 1
        } else if (item.publishState === 1) {
          return res.value === 2
        } else {
          return res.value === 3
        }
      })
      item.publishState = publishStateRes ? publishStateRes.label : ''
    }
  })
  return data
}
