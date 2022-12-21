function getData(responses) {
  let incongruents = responses.filter(arr=>arr.flanker_type=='incongruent')
  let congruents = responses.filter(arr=>arr.flanker_type=='congruent')
  let congLoadOne = congruents.filter(arr=>arr.load==1)
  let congLoadTwo = congruents.filter(arr=>arr.load==2)
  let congLoadFour = congruents.filter(arr=>arr.load==4)
  let congLoadFive = congruents.filter(arr=>arr.load==6)
  let incongLoadOne = incongruents.filter(arr=>arr.load==1)
  let incongLoadTwo = incongruents.filter(arr=>arr.load==2)
  let incongLoadFour = incongruents.filter(arr=>arr.load==4)
  let incongLoadFive = incongruents.filter(arr=>arr.load==6)
  let data = []
  data = [...data,
    {congruents : [{lowLoad : [...congLoadOne, ...congLoadTwo]}, {highLoad : [...congLoadFour, ...congLoadFive]}]},
    {incongruents : [{lowLoad : [...incongLoadOne, ...incongLoadTwo]}, {highLoad : [...incongLoadFour, ...incongLoadFive]}]}
    ]
  return data
}

function calculateRt(collection) {
    let rtObj = {
     congruentLowLoadRt : Object.values(collection[0].congruents[0].lowLoad).reduce((total,item) =>{return total + item.rt}, 0) / collection[0].congruents[0].lowLoad.length,
     congruentHighLoadRt : Object.values(collection[0].congruents[1].highLoad).reduce((total,item) =>{return total + item.rt}, 0) / collection[0].congruents[1].highLoad.length,
     incongruentLowLoadRt : Object.values(collection[1].incongruents[0].lowLoad).reduce((total,item) =>{return total + item.rt}, 0) / collection[1].incongruents[0].lowLoad.length,
     incongruentHighLoadRt : Object.values(collection[1].incongruents[1].highLoad).reduce((total,item) =>{return total + item.rt}, 0) / collection[1].incongruents[1].highLoad.length
    }
    return rtObj
}   