
// issue: The loadShareSync function was unable to load  
// 1. share was registered with the 'get' attribute, but loadShare was not used beforehand.
// or 2. share was not registered with the 'lib' attribute.
// ref: https://github.com/module-federation/core/issues/2280
import('./bootstrap')
	.catch(err => console.error(err));
