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
  console.log('==== makeTitleWithAllPositionTypes: ', talent_position_sub_types)
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
  if (talentInfo && talentInfo.talent_pictures.length > 0) {
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

  heightInFeet = UnitConverter(parseInt(tmp_height, 10))
    .from('cm').to('ft-us')
  heightIntegerInFeet = Math.floor(heightInFeet)
  heightDecimalInInch = Math.round(UnitConverter(heightInFeet - heightIntegerInFeet).from('ft-us').to('in'))

  return `${prefix}${heightIntegerInFeet}'${heightDecimalInInch}" / ${prefix}${height}cm`
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

  for (let i = 0; i < talent_videos.length; i ++) {
    let talent_video = talent_videos[i]
    if (talent_video.position_type !== defaultValues.DEFAULT_PRACTICE_POSITION_TYPE &&
      talent_video.position_type !== null) {
      res ++
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
  let res = null
  for (let i = 0; i < skills.length; i ++) {
    if (skills[i].related_position_type === positionName) {
      res = skills[i]
      break
    }
  }
  return res
}