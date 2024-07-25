import { memo } from "react"

import Header from "./Header"
import Footer from "./Footer"

function Container(props) {
    return (
        <>
            <Header />
            <main>
                {props.children}
            </main>
            <Footer />
        </>
    )
}

export default memo(Container)
