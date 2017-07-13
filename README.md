### Basic Boilerplate to setup Next as fast as possible ###

npm install
npm run dev PORT=XXXX

## Tools ##

Next.js is an open source framework to quickly do server rendered react apps with remote backends.
I chose this tool for the easyness of deploying and the low overhead to setup the entire project. Specially considering the single page app requirement it was a better choice than Rails.

Other libraries used are moment.js and react slider for the time ranges.

## Product Decisions ##

The drawings provided explained an idea for the design. Had I not seen those images, I would've chosen to go through the Google Calendar design, which allows for a finer grained control. However, it would have also been a difficult implementation, so I decided to follow more or less the requirements.

I did deviate in a couple of things:

* Did not like the moving parts of showing images on toggle, or designing around several images. The image should only be to recognize the room, so I expect a single image is enough.

* I did not use dropdown animations to show booking or more details for two reasons: the first is that dropdown is not one of the smoothest css animations, so I generally avoid it. Another is that animations that dont add for the experience, substract. A B2B product like this that will be used by professionals of varying ages and visual impairments and tastes does not need superfluous animations. This is merely an opinion reinforcing that when I tried a few, I just didnt like how they fit into this.

* I did not implement the "next meetings" filter, but implemented a smarter filter that allows you to write different criteria, including a time, which is more fine grained than a simple filter checkbox.

