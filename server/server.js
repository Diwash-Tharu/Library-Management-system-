// import {app} from './app.js';
import {app} from './app.js'

const PORT = process.env.PORT || 4000;

app.listen(process.env.PORT, () => {
    
    console.log(`Server is running on port ${PORT}`);
})

// console.log('Server is running on port ' );