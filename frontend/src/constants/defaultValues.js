export default {
  DEFAULT_USER_EMAIL: 'admin@email.com',
  DEFAULT_USER_PASSWORD: '12345678',
  DEFAULT_SHIPTALENT_INFO: [
    {
      "id": 6,
      "name": "contact_us",
      "value": "...",
      "description": "Contact Us"
    },
    {
      "id": 5,
      "name": "faq",
      "value": "...",
      "description": "Frequently Asked Questions"
    },
    {
      "id": 2,
      "name": "how_does_shiptalent_work",
      "value": "<p>It's easy. In order to audition and interview with <b>every</b> cruise line at the same time, all you have to do is create your own unique profile. </p>\r\n<p>What's in your profile? Unlinke other employment sites, your profile isn't simply a place to post your basic headshot, resume and demo reel. Sure, your profile includes these basics, ...</p>",
      "description": "How Does ShipTalent.com Work?"
    },
    {
      "id": 8,
      "name": "terms_for_client",
      "value": "...",
      "description": "Client Terms & Conditions"
    },
    {
      "id": 7,
      "name": "terms_for_talent",
      "value": "...",
      "description": "Terms & Conditions"
    },
    {
      "id": 4,
      "name": "the_shiptalent_difference",
      "value": "<p>Unlinke other employment sites, your profile isn't simply a place to post your headshot, resume and demo reel.</p>\r\n<p>There is so much more about you that needs to be seen!</p>",
      "description": "The ShipTalent.com Difference"
    },
    {
      "id": 1,
      "name": "what_is_shiptalent",
      "value": "<p>ShipTalent.com is a community of Talent with one common goal: to work on a cruise ship.</p>\r\n<p>With ShipTalent.com, singers, dancers, aerialist, musicians, technicians, activity staff and youth staff can audition and interview with <b>every</b> cruise line <b>at the same time</b> in one easy setp. No need to go to endless auditions. ...</p>",
      "description": "What is ShipTalent.com"
    },
    {
      "id": 3,
      "name": "why_use_shiptalent",
      "value": "<p>The bigger question is why would you not?</p>\r\n<p>Are you frustrated with going to audition after audition? Tired of sending application after application only to wonder if you're even being considered? Don't know how to stand out from the rest of the crowd and get your big your big break into the exciting world of cruise ship entertainment? ...</p>",
      "description": "Why use ShipTalent.com"
    }
  ],
  DEFAULT_PRACTICE_POSITION_TYPE: 'Staff', //'Practice',
	GENDERS: ["Male", "Female"],
	VISA_TYPES: [
		'B-1',
		'B-2',
		'B-1/B-2',
		'C1/D',
		'F',
		'H1-B',
		'J-1',
		'M-1',
		'O',
		'P-2',
		'Schengen'
	],
	// Unit is cm
	HEIGHTS: [
	  147,
	  150,
	  155,
	  157,
	  160,
	  163,
	  165,
	  168,
	  170,
	  173,
	  175,
	  178,
	  180,
	  183,
	  185,
	  188,
	  191,
	  193,
	  196,
	  198,
		199,
	],
	WEIGHTS: generateWeightConst(),
	AGES : [
	  '18-21',
	  '22-25',
	  '26-30',
	  '31-35',
	  '36-40',
	  '41-45',
	  '46-50',
	  '51+'
	],
	MEDICALS: [
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
		'Organ transplants',
		'I have no pre-existing medical conditions to report.',
		'I am certified in CPR.',
		'I have successfully completed a cruise line pre-employment physical in the past.'
	],
	LANGUAGES: [
		'English',
		'Spanish',
		'Portuguese',
		'German',
		'French',
		'Italian',
		'Japanese',
		'Mandarin',
		'Cantonese',
		'Russian'
	],
	FLUENCY_TYPES: [
	  'Fluent',
	  'Conversational',
	  'Basic'
	],
  CASTING_REQUEST_TITLE_DATE_FORMAT: 'M/D/YY',
  CASTING_REQUEST_DESCRIPTION_DATE_FORMAT: 'MM/DD/YYYY',
	AVAILABILITY_FORMAT: 'MM/DD/YYYY HH:mm ZZ',
	ADMIN_EDIT_PROFILE_FORMAT: 'MM/DD/YYYY HH:mm z',
	ADMIN_CASTING_REQUEST_TITLE_FORMAT: 'MMDDYYYY',
  MAIN_RATING_VALUES: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  BONUS_RATING_VALUES: ['+.25', '+.50', '+.75'],
	RATING_RANGES: [
		{start_rating: 0, end_rating: 8.00},
    {start_rating: 8.00, end_rating: 8.24},
    {start_rating: 8.50, end_rating: 8.74},
    {start_rating: 8.75, end_rating: 8.99},
    {start_rating: 9.00, end_rating: 9.24},
    {start_rating: 9.25, end_rating: 9.49},
    {start_rating: 9.50, end_rating: 9.74},
    {start_rating: 9.75, end_rating: 10.0},
	],
  HEIGHT_RANGES: [
    {start_height: 0, end_height: 153},
    {start_height: 155, end_height: 163},
    {start_height: 165, end_height: 173},
    {start_height: 175, end_height: 180},
    {start_height: 183, end_height: 193},
    {start_height: 193, end_height: 0},
	],
	CASTING_REQUEST_STATUS: {
		DRAFT: 'Draft',
		REQUESTED: 'Requested',
		REVIEWING: 'Reviewing',
		IN_PROGRESS: 'In Progress',
		ACCEPTED: 'Accepted',
		DECLINED: 'Declined',
		CANCELED: 'Canceled',
		COMPLETED: 'Completed'
	}
};

function generateWeightConst() {
	let weights = []
	for (let i = 99; i <= 251; i ++) {
		Math.round();
		weights.push(i);
	}
	return weights
}
