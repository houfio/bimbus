import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

import spec from '../api.json';

export default function App() {
  return (
    <SwaggerUI spec={spec}/>
  );
}
