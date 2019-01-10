import UnitConverter from 'convert-units';
import defaultValues from 'constants/defaultValues';


// handle user media capture
export function captureUserMedia(options, callback) {
  let params = { audio: true, video: options };
  navigator.mediaDevices.getUserMedia(params).then(callback).catch(function(error) {
      if(error && error.name === 'ConstraintNotSatisfiedError') {
          alert('Your camera or browser does NOT supports selected resolutions or frame-rates. \n\nPlease select "default" resolutions.');
      }
  });
}

export function makeTitleWithAllPositionTypes(talentInfo) {
  const { talent_position_types, talent_position_sub_types, talent_skills } = talentInfo

  let title = ''
  if (talent_position_types && talent_position_types.length > 0) {
    title = talent_position_types[0]
  }

  if (talent_position_types && talent_position_types.length > 0) {
    title =  talent_position_types[0].position_type
  }
  if (talent_position_sub_types && talent_position_sub_types.length > 0 &&
    talent_position_sub_types[0].position_sub_type) {
    title = `${title}(${talent_position_sub_types[0].position_sub_type.name})`
  }

  // Make title with all position types
  title = title + ((talent_skills.length > 0) ? ` who ${talent_skills[0].skill} ` : '')
  for (let i = 1; i < talent_skills.length; i ++) {
    title = `${title} ${(i === (talent_skills.length - 1)) ? 'and' : ','} ${talent_skills[i].skill}`
  }

  return title
}

export function getAvatarFromTalentInfo(talentInfo) {
  if (talentInfo && talentInfo.talent_pictures && talentInfo.talent_pictures.length > 0) {
    for (let i = 0; i < talentInfo.talent_pictures.length; i++) {
      if (talentInfo.talent_pictures[i].url) {
        return talentInfo.talent_pictures[i].url
      }
    }
  }
  return null
}

export function getSexTitle(sex) {
  return sex === 'm' ? 'Male' : (sex === 'f' ? 'Female' : 'None');
}

export function existSkill(skills, name) {
  let skill = skills.find(function(element) {
    return element === name;
  });
  // return skill ? true : false
  return !!skill
}


export function convertCm2Feet(cm) {
  let feet = UnitConverter(parseInt(cm, 10)).from('cm').to('ft-us');
  let integerFeet = Math.floor(feet);
  let decimalInch = Math.round(UnitConverter(feet - integerFeet).from('ft-us').to('in'));

  return `${integerFeet}'${decimalInch}"`
}

export function makeHeight(height) {
  const { HEIGHTS } = defaultValues
  let heightInFeet = 0
  let heightIntegerInFeet = 0
  let heightDecimalInInch = 0
  let prefix = ''
  let tmp_height = height

  // Find index
  let index = HEIGHTS.findIndex(function(h) {
    return h === height
  })
  if (index === (HEIGHTS.length - 1)) {
    tmp_height = HEIGHTS[HEIGHTS.length - 2]
    prefix = '>'
  }

  // heightInFeet = UnitConverter(parseInt(tmp_height, 10))
  //   .from('cm').to('ft-us')
  // heightIntegerInFeet = Math.floor(heightInFeet)
  // heightDecimalInInch = Math.round(UnitConverter(heightInFeet - heightIntegerInFeet).from('ft-us').to('in'))

  return `${prefix}${convertCm2Feet(tmp_height)}" / ${prefix}${height}cm`
}


export function makeWeight(weight) {
  const { WEIGHTS } = defaultValues
  let weightInLb = 0
  let prefix = ''
  let tmp_weight = weight

  let index = WEIGHTS.findIndex(function(w) {
    return w === weight
  })

  if (index === (WEIGHTS.length - 1)) {
    tmp_weight = WEIGHTS[WEIGHTS.length - 2]
    prefix = '>'
  }
  weightInLb = Math.round(UnitConverter(tmp_weight).from('lb').to('kg') * 10) / 10
  return `${prefix}${tmp_weight} lbs. / ${prefix}${weightInLb} kg`
}

export function makeLanguages(talent_languages) {
  let res = ''

  for (let i = 0; i < talent_languages.length; i ++) {
    let talent_language = talent_languages[i]
    res = res + talent_language.language + ' '
  }

  return res
}

export function makeImages (talent_pictures) {
  let images = []

  for (let i = 0; i < talent_pictures.length; i ++) {
    let talent_picture = talent_pictures[i]
    if (i < 5) {
      images.push(talent_picture.url)
    }
  }

  return images
}

export function getPracticVideoNumbers(talent_videos) {
  let res = 0

  for (let i = 0; i < talent_videos.length; i ++) {
    let talent_video = talent_videos[i]

    if (talent_video.position_type === defaultValues.DEFAULT_PRACTICE_POSITION_TYPE ||
      talent_video.position_type === null) {
      res ++
    }
  }

  return res
}

export function getLiveVideoNumbers(talent_videos) {
  let res = 0

  if (talent_videos) {
    for (let i = 0; i < talent_videos.length; i ++) {
      let talent_video = talent_videos[i]
      if (talent_video.position_type !== defaultValues.DEFAULT_PRACTICE_POSITION_TYPE &&
        talent_video.position_type !== null) {
        res ++
      }
    }
  }

  return res
}

export function checkPreviousShipMedical(medicals) {
  let checkingMedicals = [
    'Pregnancy',
    'Epilepsy',
    'Insulin dependent diabetes',
    'Anxiety, mental or mood disorders',
    'Alcohol or drug addiction problems',
    'Eating disorders',
    'Body Mass Index greater than 30 or less than 18',
    'Diseases of the heart or arteries',
    'Hypertension',
    'Coronary bypass surgery or angioplasty', //
    'Other conditions which can lead to sudden incapacity',
    'Conditions which limit mobility and stamina both under normal and emergency conditions',
    'Medication with side effects which reduce performance or alertness',//
    'Irregular heart rhythm',
    'Use of a pacemaker',
    'Diseases of the lungs',
    'Unexplained loss of consciousness',
    'Severe head injury or major brain surgery',
    'Severe deafness',
    'Joint replacements',
    'Limb prostheses',
    'Organ transplants'
  ]
  let res = false

  for (let i = 0; i < medicals.length; i ++) {
    let medical = medicals[i]

    for (let j = 0; j < checkingMedicals.length; j ++) {
      let chekingMedical = checkingMedicals[j]

      if ((medical.condition_title === chekingMedical) && medical.condition_value) {
        res = true
      }
    }
  }

  return res
}

export function checkCPR(medicals) {
  let cprMedical = medicals.find((medical) => {
    return medical.condition_title === 'I am certified in CPR.'
  })
  console.log('==== checkCPR: ', cprMedical, medicals)
  return cprMedical ? cprMedical.condition_value : false
}

export function  getLanguageIndex(name) {
  return defaultValues.LANGUAGES.indexOf(name);
}

export function findRelatedSkillByPositionName(skills, positionName) {
  return skills.find(function(skill) {
    return skill.related_position_type === positionName;
  });
}

export function findVideoIndexByPriority(videos, priority) {
  return videos.findIndex(function(video) {
    return video.priority === priority;
  });
}

export function findVideoByPriority(videos, priority) {
  return videos.find(function(video) {
    return video.priority === priority;
  });
}

export function findPositionTypeByName(allPositionTypes, name) {
  return allPositionTypes.find(function(positionType) {
    return positionType.name === name;
  });
}

export function findSkillByName(allSkills, name) {
  return allSkills.find(function(skill) {
    return skill.name === name;
  });
}

export function getPrefixByWord(positionTypeName) {
  let firstLetter = positionTypeName.substring(0, 1)
  let res = 'a'

  if (firstLetter === 'A' || firstLetter === 'a' ||
    firstLetter === 'E' || firstLetter === 'e' ||
    firstLetter === 'I' ||  firstLetter === 'i' ||
    firstLetter === 'O' ||  firstLetter === 'o' ||
    firstLetter === 'U' ||  firstLetter === 'u' ||
    firstLetter === 'W' ||  firstLetter === 'w' ||
    firstLetter === 'Y' ||  firstLetter === 'y'
  ) {
    res = 'an'
  }

  return res
}

export function getSubSkillVideosByPositionType(talentSubSkillVideos, allSkills, positionType) {
  let videos = []

  if (talentSubSkillVideos && allSkills && positionType) {
    const skill = findRelatedSkillByPositionName(allSkills, positionType.name)

    if (skill) {
      const res = talentSubSkillVideos.map((video) => {
        const subSkillID = video.sub_skill

        let subSkill = skill.sub_skills.find(function(sub_skill) {
          return sub_skill.id === subSkillID;
        });

        if (subSkill) {
          videos.push(subSkill)
        }

        return subSkill
      })
    }
  }

  return videos
}

export function getSubSkillVideoNumbersByPositionType(talentSubSkillVideos, allSkills, positionType) {
  const videos = getSubSkillVideosByPositionType(talentSubSkillVideos, allSkills, positionType)
  return videos.length
}

const positionPaths = [
  {name: 'Actor', path: '/video-acting-audition-videos'},
  {name: 'Vocal', path: '/video-vocal-audition-videos'},
  {name: 'Dance', path: '/video-dance-audition-videos'},
]

export function getPathByPositionName(positionName) {
  let res = positionPaths.find(function(positionPath) {
    return positionPath.name === positionName;
  });

  if (!res) {
    res = '/video-positions'
  }

  return res
}

export function filterWizardQuestionScenarioByPosition(wizardQuestionScenario, position) {
  return wizardQuestionScenario.filter(scenarioItem => scenarioItem.position_type.id === position.id);
}

export function filterWizardQuestionScenarioByPositionName(wizardQuestionScenario, positionName) {
  return wizardQuestionScenario.filter(scenarioItem => scenarioItem.position_type.name === positionName);
}

export function findAnswer(wizardQuestionAnswers, answer) {
  return wizardQuestionAnswers.find(function(wizardQuestionAnswer) {
    return wizardQuestionAnswer.id === answer.id;
  });
}

export function findAnswerIndex(wizardQuestionAnswers, answer) {
  return wizardQuestionAnswers.find(function(wizardQuestionAnswer, index) {
    if(wizardQuestionAnswer.id === answer.id)
      return index
  });
}

export function generateLinkWithPosition(position, link) {
  return {
    pathname: link,
    state: { position }
  }
}

export function makeTalentOverviewTitle(talent) {
  return talent.user ? `${talent.user.first_name} ${talent.user.last_name} (${talent.tid}) - ${getSexTitle(talent.sex)} ${makeTitleWithAllPositionTypes(talent)}` : '';
}

export function arrayUnique(array, fieldName) {
  let a = array.concat();

  for(let i = 0; i < a.length; ++i) {
    for(let j = i + 1; j < a.length; ++j) {
      if(a[i][fieldName] === a[j][fieldName])
        a.splice(j--, 1);
    }
  }

  return a;
}

export function makeRatingSearchConditionTitle(ratingCondition) {
  let start_rating = ratingCondition.start_rating > 0 ? ratingCondition.start_rating.toFixed(2) : 0;
  let end_rating = ratingCondition.end_rating > 0 ? ratingCondition.end_rating.toFixed(2) : 0;

  if (start_rating === 0 ) return `<${end_rating}`;
  else if (end_rating === 0 ) return `>${start_rating}`;
  else return `${start_rating}-${end_rating}`;
}

export function makeHeightSearchConditionTitle(heightCondition) {
  let start_height = heightCondition.start_height > 0 ? convertCm2Feet(heightCondition.start_height) : 0;
  let end_height = heightCondition.end_height > 0 ? convertCm2Feet(heightCondition.end_height) : 0;

  if (start_height === 0 ) return `<${end_height}`;
  else if (end_height === 0 ) return `>${start_height}`;
  else return `${start_height}-${end_height}`;
}