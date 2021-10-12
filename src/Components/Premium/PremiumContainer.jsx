import React, { useState } from 'react';

// Modules
import PremiumView from './PremiumView';

const PremiumContainer = (props) => {

    const [card, setCard] = useState(
        {
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
        }
    );

    return <PremiumView

        card={card}
        setCard={e => setCard(e)}
    />
}

export default PremiumContainer;