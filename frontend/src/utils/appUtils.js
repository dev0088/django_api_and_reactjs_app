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
