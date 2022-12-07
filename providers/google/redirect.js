import * as queryString from 'query-string';
import { ConfigError } from '../../utils/errors';

export default function redirect({ env, options }) {
	options.clientId = env.GOOGLE_CLIENT_ID
	options.redirectUrl = 'https://oauth.do/callback/google'
	const {
		clientId,
		redirectUrl,
		scope = 'openid email profile',
		responseType = 'code',
		state = 'pass-through value'
	} = options;
	if (!clientId) {
		throw new ConfigError({
			message: 'No client id passed'
		});
	}
	const params = queryString.stringify({
		client_id: clientId,
		redirect_uri: redirectUrl,
		response_type: responseType,
		scope,
		include_granted_scopes: 'true',
		state
	});

	const url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
	return url;
}
