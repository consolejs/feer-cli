const getItem = (i) => {
	return {
		'id': i,
		'text': i + '探清水河（三弦版)',
		'url': 'https://www.google.com/'
	}
}

const lists = [];

for (let i = 0; i < 10; i++) {
	lists.push(getItem(i))
}

const dataInfo = {
	schema: {
		response: {
			200: {
				'type': 'object',
				'properties': {
					'code': {
						'type': 'number'
					},
					'data': {
						'type': 'object',
						'properties': {
							'lists': {
								'type': 'array',
								'id': {
									'type': 'number'
								},
								'text': {
									'type': 'string'
								},
								'url': {
									'type': 'string'
								}
							}
						}
					},
					'msg': {
						'type': 'string'
					}
				}
			}
		}
	},
	handler(request, reply) {
		reply.send({
			'code': 0,
			'data': {
				lists
			},
			'msg': 'Some of the message!'
		})
	}
}

module.exports = dataInfo