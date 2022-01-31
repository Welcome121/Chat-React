import appConfig from '../config.json'
import { Box } from '@skynexui/components'

export default function errorPage(){
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary["900"],
                backgroundImage: 'url(https://www.miguelsantiago.com.br/wp-content/uploads/2019/03/erro-404-1-1024x580.png)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            }}
        >  
        </Box>
    )
    
}