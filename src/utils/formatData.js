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
        return res.value === item.chkState
      })
      item.chkState = chkStateRes ? chkStateRes.label : ''
    }
    if (item.publishState !== undefined) {
      const publishStateRes = publishType.find(res => {
        return res.value === item.publishState
      })
      item.publishState = publishStateRes ? publishStateRes.label : ''
    }
  })
  return data
}
