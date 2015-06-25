Logo
======================

![F.A.R.O. logged on Twitter](https://raw.githubusercontent.com/martinsantome/FARO_twitter_ear/5ea36a0397b03f818c61949d2f5d98ebde2c45e4/img/faro_twitter_front.png)


Twitter dev starting point doc
=============================
![Twitter dev docs:](https://dev.twitter.com/web/embedded-timelines)

[Twitter-side] Account
=======================
twitter.com/f_a_r_o_
 
⊙ ɐɔıƃoloʇuo ɐıɔuǝılısǝɹ ǝp ouɐıpɐɔɹɐ oɹɔlnɟ ⊙

Please, see fork to follow authory.

[Code-base] Hacking-Hacker-Culture // impressjs
======================

Talk on Hacking and Hacker Culture for AngelHack Kochi, Spring 2014 | April 17-18, 2014 | Made with impressJS by @bartaz

X3D abilities
===============
<h2><a name="Applications">Applications, Players and Plugins for X3D / VRML Viewing</a></h2>  
 <p>
      Extensible 3D (X3D) is the third-generation successor to the Virtual Reality Modeling Language (VRML), 
      providing full backwards compatibility and adding functionally equivalent XML and compressed-binary file encodings.
  </p>
  <ul>
      <li>
          <a href="http://www.web3d.org/x3d/wiki/index.php/Player_support_for_X3D_components">Player support for X3D components</a>
          provides a feature comparison of major X3D viewers, for each player and each X3D component.
      </li>
      <li>
              A simple example test scene is
              <a href="HelloWorld.x3d" target="hello">HelloWorld.x3d</a>
              provided in a variety of X3D encodings:
              <br>
              (<a href="HelloWorld.x3d" target="hello">.x3d&nbsp;XML</a>,
              <a href="HelloWorld.x3dv" target="hello">.x3dv&nbsp;ClassicVRML</a>,
              <a href="HelloWorld.wrl" target="hello">.wrl&nbsp;VRML97</a>,
              <a href="HelloWorld.html" target="hello">.html&nbsp;listing</a>,
              <a href="HelloWorld.xhtml" target="hello">.xhtml&nbsp;X3DOM</a>,
              <a href="HelloWorld.x3db" target="hello">.x3db&nbsp;compression</a>,
              <a href="HelloWorldCanonical.xml" target="hello">C14N&nbsp;canonicalization</a>, and
              <a href="HelloWorld.tall.png" target="hello">.png&nbsp;image</a>)
      </li>
      <li>
              The 
              <a href="HelloWorld.x3d" target="hello">HelloWorld.x3d</a>
              scene is a simple authoring example that illustrates the minimalist X3D Interchange profile.
              Also available: internationalized 
              <a href="http://x3dgraphics.com/examples/X3dForAdvancedModeling/#HelloWorldScenes" target="hello">Hello World Scenes</a>.
      </li>
      <li>
              Please install one of the following X3D players
              to view X3D/VRML scenes and browse these examples.
      </li>
  </ul>

  <p>
      <a name="plugin">X3D players and plugins</a> 
      from <a href="http://www.web3d.org/membership" target="_blank">Web3D Consortium members</a>:
  </p>

  <ul>
      <li><a href="http://www.bitmanagement.de" target="_blank">BitManagement</a>'s 
          <a href="http://www.bitmanagement.de/en/products/interactive-3d-clients/bs-contact" target="_blank">BS Contact</a>
          and
          <a href="http://www.bitmanagement.de/en/products/interactive-3d-clients/bs-contact-geo" target="_blank">BS Contact Geo</a>
          X3D/VRML97 plugins for Internet Explorer (Linux MacOSX Windows)
         (<a href="http://www.bitmanagement.de/en/contact" target="_blank">support</a>).
      </li>
      <li><a href="http://instantreality.org" target="_blank">InstantReality</a> is a high-performance X3D player and Mixed Reality (MR) system by Fraunhofer IGD 
          (Linux MacOSX Windows)
         (<a href="http://forum.instantreality.org" target="_blank">forum</a>).
      </li>
      <li><i>Special mention.</i>
          <a href="http://x3dom.org" target="_blank">X3DOM</a> (pronounced "X-Freedom")
          implements a high-performance X3D player in open-source Javascript.
          Authors can publish X3D source within an HTML5 page that works with Web browsers <em>without</em> prior plugin installation
         (<a href="http://www.x3dom.org/?page_id=3" target="_blank">get&nbsp;involved</a>
          and
          <a href="https://sourceforge.net/p/x3dom/discussion" target="_blank">forum</a>).
      </li>
      <li><a href="http://freewrl.sourceforge.net" target="_blank">FreeWRL/FreeX3D</a> X3D/VRML browser (open-source&nbsp;C).
          (Linux MacOSX Windows)
          (<a href="http://freewrl.sourceforge.net/contact.html" target="_blank">contact</a>,
          (<a href="https://sourceforge.net/p/freewrl/bugs" target="_blank">bug&nbsp;tickets</a>).
          Also described on 
          <a href="http://en.wikipedia.org/wiki/FreeWRL" target="_blank">Wikipedia</a>.
      </li>
      <li><a href="http://www.sensegraphics.com/index.php?option=com_content&amp;task=view&amp;id=148&amp;Itemid=66" target="_blank">Sensegraphics H3DAPI</a>--&gt;
          <a href="http://www.h3dapi.org" target="_blank">H3D</a>
          is an open-source C++&nbsp;API and X3D player
          (Linux MacOSX Windows)
          (<a href="http://www.h3dapi.org/modules/newbb" target="_blank">forum</a>).
          <ul>
              <li>Includes
                  haptics support,
                  <a href="http://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html" target="_blank">Rigid Body Physics component</a>,
                  plus 
                  3D texturing 
                  and the
                  <a href="http://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html" target="_blank">Volume Visualization component</a>
                  for the 
                  <a href="http://www.web3d.org/realtime-3d/working-groups/medx3d" target="_blank">Medical Working Group</a>.
              </li>
          </ul>
      </li>
      <li><a href="https://savage.nps.edu/Savage/developers.html#Xj3D" target="_blank">Xj3D</a>
          is an open-source Java viewer and application codebase for X3D graphics scenes.
          <ul>
              <li>
                    <i>New.</i> The
                    <a href="http://web3d.org/wiki/index.php/Xj3D_Evolution">Xj3D&nbsp;Evolution</a>
                    strategy describes how            
                    Web3D working-group stakeholders are considering and implementing further improvements to Xj3D.
              </li>
              <li>
                  <a href="https://savage.nps.edu/Savage/developers.html#Xj3D" target="_blank">NPS source branch for Xj3D viewer</a>
                  describes current details while migrating everything to the
                  <a href="https://sourceforge.net/projects/xj3d">Xj3D Sourceforge</a>
                  project.
              </li>
              <li>
                 (<a href="http://bugzilla.xj3d.org" target="_blank">bugtracker</a>,
                  <a href="mailto:source@web3D.org?subjectXj3D%20support%20request">mailing list</a>,
                  <a href="http://web3d.org/mailman/listinfo/source_web3d.org" target="_blank">subscribe</a>)
              </li>
              <li>
                  Original
                  <a href="http://www.xj3d.org" target="_blank">Xj3D.org</a>
                  distribution includes
                  <a href="http://www.xj3d.org/snapshots.html" target="_blank">developer page</a>,
                  and browser-launchable
                  <a href="http://downloads.xj3d.org/webstart" target="_blank">Java&nbsp;WebStart</a> version.
              </li>
          </ul>
      </li>
      <li>
          <a href="http://www.geovrml.org" target="_blank">GeoVrml Run-Time</a> was originally used for VRML97 GeoVrml examples.
      </li>
  </ul>
  
[License]
============================
  Licencia CC By SA NC 4.0: Puedes usar, copiar, consumir los contenidos siempre que menciones al autor y compartas cualquier contenido derivado con la misma licencia. En ningún caso si sacas un beneficio económico de ello. Para cualquier otro uso, necesitas un permiso explícito. Copyleft. Todos los errores reservados. Los derechos pertenecen y están registrados en SafeCreative a nombre (apócrifo) del compadre don Antonio Machado, algunos derechos reservados. 
