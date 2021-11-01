import React from 'react'

function AboutScreen() {
    return (
        <section className="lg:grid lg:grid-cols-2 lg:gap-4 lg:py-12 bg-black lg:p-10 lg:px-6 xl:px-24">
            <div className="px-16">
                <h1 className="lg:mt-6 text-6xl font-bold text-gray-300 py-4">About</h1>
                <p className="mt-6 text-gray-300 text-sm">
                    The United States has 62 protected areas known as national parks that are operated by the National Park Service, an agency of the Department 
                    of the Interior. National parks must be established by an act of the United States Congress. A bill creating the first national park, Yellowstone, was signed into law by President 
                    Ulysses S. Grant in 1872, followed by Mackinac National Park in 1875 (decommissioned in 1895), and then Rock Creek Park (later merged into National Capital Parks), Sequoia and Yosemite in 1890.
                </p>
                <p className="mt-6 text-gray-300 text-sm">
                    The Organic Act of 1916 created the National Park Service "to conserve the scenery and the natural and historic objects and wildlife therein, and to provide for the enjoyment of the same in such manner and by such means as will leave them unimpaired for the enjoyment of future generations." Many current national parks had been previously protected as national monuments by the president under the Antiquities Act before being upgraded by Congress.
                </p>
                <p className="mt-6 text-gray-300 text-sm">
                    Seven national parks (including six in Alaska) are paired with a national preserve, areas with different levels of protection that are administered together but considered separate units and whose areas are not included in the figures below. Criteria for the selection of national parks include natural beauty, unique geological features, unusual ecosystems, and recreational opportunities (though these criteria are not always considered together). National monuments, on the other hand, are frequently chosen for their historical or archaeological significance.
                </p>
                <p className="mt-6 text-gray-300 text-sm">
                    Fourteen national parks are designated UNESCO World Heritage Sites (WHS), while 21 national parks are designated UNESCO Biosphere Reserves (BR). Eight national parks are designated in both UNESCO programs.
                </p>
                <p className="mt-6 text-gray-300 text-sm">
                    National park information courtesy of <a className="text-green-500" href="https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States">Wikipedia.</a>
                </p>
            </div>
            <div className="grid grid-cols-2 gap-2 m-8 mb-0">
                <img className="p-2 rounded-lg h-full object-cover" src={"https://visitutahkenticoprod.blob.core.windows.net/cmsroot/visitutah/media/site-assets/three-season-photography/mighty-5/zion-2/zion-national-park-4_mighty-five_payne_angie_2020.jpg"}></img>
                <img className="p-2 rounded-lg h-full object-cover" src={"https://npca.s3.amazonaws.com/images/8696/8d5006eb-116e-43ca-8c5f-9b376a78d152-banner.jpg?1445970301"}></img>
                <img className="p-2 rounded-lg h-full object-cover" src={"https://w4i6y9x4.stackpathcdn.com/wp-content/uploads/2018/08/AdobeStock_108028204-1080x675.jpeg"}></img>
                <img className="p-2 rounded-lg h-full object-cover" src={"https://i.natgeofe.com/n/23125495-1307-4f0c-8583-602d9048b41b/gettyimages-667781269_16x9.jpg"}></img>
            </div>
        </section>
    )
}

export default AboutScreen
