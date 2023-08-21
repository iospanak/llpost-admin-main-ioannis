import React from 'react';

import Document, {Head, Html, Main, NextScript} from 'next/document';

class MyDocument extends Document {
	crossOrigin : string = 'true';
	render() {
		return (
			<Html lang='en'>
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com"/>
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={`true`}/>
					<link href="https://fonts.googleapis.com/css2?family=Blinker:wght@300;400;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
				</Head>
				<body>
				<Main />
				<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
