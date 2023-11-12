> The article is very helpful for the gamer.

# What are the main graphics settings that affect performance in PC games? 

In 2D games, there are not many causes impacting performance, but you could find some common points in the following description based on 3D games. The bottleneck of modern games is more complex than before, when modern game lighting(mapping) and so on is becoming a memory intensive task with 3000+ MHz frequency RAM and Windows Defender Real-time Check:).

1. It is most important that you use or do not use a separate graphics card, with the proper installation of lastest graphics card driver. Or better default settings.

2. Draw Distance/Field of View. 

In computer graphics, draw distance (render distance or view distance) is the maximum distance of objects in a three-dimensional scene that are drawn by the rendering engine. Polygons that lie beyond the draw distance will not be drawn to the screen. Older games had far shorter draw distances, most noticeable in vast, open scenes, which plays an important role in high efficiency.

3. Shadow And Lighting Quality 

3.1 Shadow/Reflections

Real-time shadows have quite a high rendering overhead; any game objects that might cast shadows must first be rendered into the shadow map and then that map will be used to render objects that might receive shadows. Soft shadows have a greater rendering overhead than hard shadows, but this only affects the GPU and does not cause much extra CPU work. Rendering real-time shadows for complex geometry is prohibitively expensive. 

The setting switch shadow quality choice using low LOD meshes, primitives, fake shadows using a blurred texture applied to a simple mesh, quad underneath your characters, or can create blob shadows with custom shaders is a big performance issue. 

And in Unity, you could switch real-time to baked lighting or a mix of the two (called mixed lighting).Baked lighting is when Unity performs lighting calculations in advance and saves the results as lighting data, which is then applied at runtime. Use lightmapping to “bake” (pre-compute) lighting and shadows where appropriate. 

3.2 Lighting Quality and Quality Setting

In Unity, you could use "forward rendering path" to perform an approximation computation by Render Mode. And you could use "Pixel Light Count" quality setting to increase light render performance. There are Per-pixel lights and Spherical Harmonics lights could be considered.
Level of Detail (LOD) for meshes is also a different quality setting.

4. Frequency of Rendering

5. Resolution

6. Anisotropic Filtering

In 3D computer graphics, anisotropic filtering (abbreviated AF) is a method of enhancing the image quality of textures on surfaces of computer graphics that are at oblique viewing angles with respect to the camera where the projection of the texture appears to be non-orthogonal.
The sample count required can make anisotropic filtering extremely bandwidth-intensive. Multiple textures are common; each texture sample could be four bytes or more, so each anisotropic pixel could require 512 bytes from texture memory, although texture compression is commonly used to reduce this.

7. Antialiasing

Anti-Aliasing used to be a big deal, but now GPU's come with very specific anti-aliasing hardware. If turn on antialiasing with 16xx and by a hardware not supported specific anti-aliasing, it needs more settings.

8. V-Sync

V-Sync, or vertical synchronization, prevents screen tearing. It does so by syncing the refresh rate of your monitor to how many frames your graphics card is producing. It introduces a hair of input(IO) lag. 

9. Virtual Paging/texture streaming/Virtual Texture Paging Streaming 

Whatever they call it specific to certain games is a real game killer. If you could play games with a large amount of memory, never use it.

10. Texure clampling

Texure clampling has a huge impact on peformance, but most games don't let you adjust it, fortunately you can adjust it using Nvidia Inspector to where it affects some games. Clamp Textures to Edge and you could gain 20FPS on doom2016 depending on your rig. It's a great trick, but it can also produce nasty glitches.
