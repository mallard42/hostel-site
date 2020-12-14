import React, { Component } from 'react';

import Title from '../components/Title';

class PrivacyPolicy extends Component {
    render() {
        const article = (nb) => {
                return (
                    <div className="section-margin">
                        <h4>Article {nb} </h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Vestibulum at lacinia neque, ac feugiat odio. Mauris 
                            porttitor sed ante in sagittis. Pellentesque habitant morbi 
                            tristique senectus et netus et malesuada fames ac turpis egestas. 
                            Phasellus nec congue risus. Morbi ultrices, nisi vitae iaculis 
                            rutrum, est nunc porttitor nunc, ut venenatis libero dolor sit 
                            amet turpis. Nam tempus tempor eros rhoncus fermentum. Fusce 
                            suscipit convallis arcu eget convallis. Nullam elementum in metus 
                            sed consectetur.
                        </p>
                    </div>
                );
        }

        return (
            <div className="legal-center section-margin">
                <Title title="Privacy Policy"/>
                { article(1) }
                { article(2) }
                { article(3) }
                { article(4) }
                { article(5) }
                { article(6) }
                { article(7) }
                { article(8) }
                { article(9) }
            </div>
        )
    }
}

export default PrivacyPolicy;