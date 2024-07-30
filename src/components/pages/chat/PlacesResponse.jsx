import {
    MapIcon,
    WebsiteIcon,
} from '../../../assets/constants/Constant.js';

import {
    MapPlacesWrapper,
    PlacePillsWrapper,
} from './PlacesResponse.style.js';

function PlacesResponse({ places }) {
    return (
        <MapPlacesWrapper>
            {places.map((place, index) => {
                const {
                    displayName,
                    formattedAddress,
                    googleMapsUri,
                    rating,
                    websiteUri,
                } = place

                return (
                    <div className="places" key={index}>
                        <span>
                            {index + 1}.
                        </span>

                        <div className="place-item">
                            <div>
                                <span className="name">
                                    <b>{displayName.text}</b>
                                </span>

                                {rating && (
                                    <>
                                        &ensp;<span className="rating">4.3 ★</span>
                                    </>
                                )}
                            </div>

                            <div>
                                <span className="address">{formattedAddress}</span>
                            </div>

                            <PlacePillsWrapper>
                                {websiteUri && (
                                    <div className='pills'>
                                        <a href="https://www.gujaratuniversity.ac.in/" target="_blank">
                                            <img
                                                src={WebsiteIcon}
                                                alt="Website"
                                            />
                                            Visit Website
                                        </a>
                                    </div>
                                )}

                                {googleMapsUri && (
                                    <div className='pills'>
                                        <a href="https://maps.google.com/?cid=1914170029072132991" target="_blank">
                                            <img
                                                src={MapIcon}
                                                alt="Map"
                                            />
                                            View on Google Maps
                                        </a>
                                    </div>
                                )}
                            </PlacePillsWrapper>
                        </div>
                    </div>
                )
            })}
        </MapPlacesWrapper>
    )
}

export default PlacesResponse
