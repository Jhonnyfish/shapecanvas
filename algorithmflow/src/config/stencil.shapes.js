import { dia } from '@clientio/rappid';
import { ALGORITHM_ICON, PADDING_L, FONT_FAMILY, LIGHT_COLOR } from '../theme'
const SHAPE_WIDTH = 80
const SHAPE_HEIGHT = 20
export  function defineStencilAlgorithm(){
    dia.Element.define('stencil.Algorithm', {
        name: 'Algorithm',
        size: { width: SHAPE_WIDTH, heigth: SHAPE_HEIGHT },
        attrs: {
            icon: {
                width: 30,
                height: 30,
                xlinkHref: ALGORITHM_ICON
            },
            label: {
                text: 'Algorithm',
                refDx: -140,
                refDy: 15,
                textAnchor: 'start',
                textVerticalAnchor: 'middle',
                fill: 'white',
                fontFamily: FONT_FAMILY,
                fontSize: 20

            }
        }
    }, {
        markup: [
            {
                tagName: 'image',
                selector: 'icon'
            }, {
                tagName: 'text',
                selector: 'label'
            }
        ]
    }
    )
} 