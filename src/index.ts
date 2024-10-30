import {app} from './app'
import {SETTINGS} from './settings'
import {runDB} from "./db/MongoDB";

const startApp = async () => {

    await runDB()
    app.listen(SETTINGS.PORT, () => {
        console.log('...server started in port ' + SETTINGS.PORT)
    })
    app.set('trust proxy', true)
}
startApp()