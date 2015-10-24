var GLX=function(a,b,c){var d=document.createElement("CANVAS");d.style.position="absolute",d.width=b,d.height=c,a.appendChild(d);var e,f={antialias:!0,depth:!0,premultipliedAlpha:!1};try{e=d.getContext("webgl",f)}catch(g){}if(!e)try{e=d.getContext("experimental-webgl",f)}catch(g){}if(!e)throw new Error("WebGL not supported");return d.addEventListener("webglcontextlost",function(a){console.warn("context lost")}),d.addEventListener("webglcontextrestored",function(a){console.warn("context restored")}),e.viewport(0,0,b,c),e.cullFace(e.BACK),e.enable(e.CULL_FACE),e.enable(e.DEPTH_TEST),e.clearColor(.5,.5,.5,1),e.anisotropyExtension=e.getExtension("EXT_texture_filter_anisotropic"),e.anisotropyExtension&&(e.anisotropyExtension.maxAnisotropyLevel=e.getParameter(e.anisotropyExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT)),GLX.use(e)};GLX.use=function(a){return function(b){var c={};return c.context=a,c.start=function(a){return setInterval(function(){requestAnimationFrame(a)},17)},c.stop=function(a){clearInterval(a)},c.destroy=function(a){a.canvas.parentNode.removeChild(a.canvas),a.canvas=null},c.util={},c.util.nextPowerOf2=function(a){return a--,a|=a>>1,a|=a>>2,a|=a>>4,a|=a>>8,a|=a>>16,a++,a},c.util.calcNormal=function(a,b,c,d,e,f,g,h,i){var j=a-d,k=b-e,l=c-f,m=d-g,n=e-h,o=f-i,p=k*o-l*n,q=l*m-j*o,r=j*n-k*m;return this.calcUnit(p,q,r)},c.util.calcUnit=function(a,b,c){var d=Math.sqrt(a*a+b*b+c*c);return 0===d&&(d=1e-5),[a/d,b/d,c/d]},c.Buffer=function(a,c){this.id=b.createBuffer(),this.itemSize=a,this.numItems=c.length/a,b.bindBuffer(b.ARRAY_BUFFER,this.id),b.bufferData(b.ARRAY_BUFFER,c,b.STATIC_DRAW),c=null},c.Buffer.prototype={enable:function(){b.bindBuffer(b.ARRAY_BUFFER,this.id)},destroy:function(){b.deleteBuffer(this.id),this.id=null}},c.Framebuffer=function(a,b){this.setSize(a,b)},c.Framebuffer.prototype={setSize:function(a,d){if(this.frameBuffer=b.createFramebuffer(),b.bindFramebuffer(b.FRAMEBUFFER,this.frameBuffer),a=c.util.nextPowerOf2(a),d=c.util.nextPowerOf2(d),a!==this.width||d!==this.height){if(this.width=a,this.height=d,this.renderBuffer=b.createRenderbuffer(),b.bindRenderbuffer(b.RENDERBUFFER,this.renderBuffer),b.renderbufferStorage(b.RENDERBUFFER,b.DEPTH_COMPONENT16,a,d),this.renderTexture&&this.renderTexture.destroy(),this.renderTexture=new c.texture.Data(a,d),b.framebufferRenderbuffer(b.FRAMEBUFFER,b.DEPTH_ATTACHMENT,b.RENDERBUFFER,this.renderBuffer),b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,this.renderTexture.id,0),b.checkFramebufferStatus(b.FRAMEBUFFER)!==b.FRAMEBUFFER_COMPLETE)throw new Error("This combination of framebuffer attachments does not work");b.bindRenderbuffer(b.RENDERBUFFER,null),b.bindFramebuffer(b.FRAMEBUFFER,null)}},enable:function(){b.bindFramebuffer(b.FRAMEBUFFER,this.frameBuffer),b.bindRenderbuffer(b.RENDERBUFFER,this.renderBuffer)},disable:function(){b.bindFramebuffer(b.FRAMEBUFFER,null),b.bindRenderbuffer(b.RENDERBUFFER,null)},getData:function(){var a=new Uint8Array(this.width*this.height*4);return b.readPixels(0,0,this.width,this.height,b.RGBA,b.UNSIGNED_BYTE,a),a},destroy:function(){this.renderTexture&&this.renderTexture.destroy()}},c.Shader=function(a){if(this.id=b.createProgram(),this.attach(b.VERTEX_SHADER,a.vertexShader),this.attach(b.FRAGMENT_SHADER,a.fragmentShader),b.linkProgram(this.id),!b.getProgramParameter(this.id,b.LINK_STATUS))throw new Error(b.getProgramParameter(this.id,b.VALIDATE_STATUS)+"\n"+b.getError());this.attributeNames=a.attributes,this.uniformNames=a.uniforms},c.Shader.prototype={locateAttribute:function(a){var c=b.getAttribLocation(this.id,a);return 0>c?void console.error('unable to locate attribute "'+a+'" in shader'):(b.enableVertexAttribArray(c),void(this.attributes[a]=c))},locateUniform:function(a){var c=b.getUniformLocation(this.id,a);return 0>c?void console.error('unable to locate uniform "'+a+'" in shader'):void(this.uniforms[a]=c)},attach:function(a,c){var d=b.createShader(a);if(b.shaderSource(d,c),b.compileShader(d),!b.getShaderParameter(d,b.COMPILE_STATUS))throw new Error(b.getShaderInfoLog(d));b.attachShader(this.id,d)},enable:function(){b.useProgram(this.id);var a;if(this.attributeNames)for(this.attributes={},a=0;a<this.attributeNames.length;a++)this.locateAttribute(this.attributeNames[a]);if(this.uniformNames)for(this.uniforms={},a=0;a<this.uniformNames.length;a++)this.locateUniform(this.uniformNames[a]);return this},disable:function(){if(this.attributes)for(var a in this.attributes)b.disableVertexAttribArray(this.attributes[a]);this.attributes=null,this.uniforms=null},destroy:function(){this.disable(),this.id=null}},c.Matrix=function(a){a?this.data=new Float32Array(a):this.identity()},function(){function a(a){return a*Math.PI/180}function b(a,b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],i=b[5],j=b[6],k=b[7],l=b[8],m=b[9],n=b[10],o=b[11],p=b[12],q=b[13],r=b[14],s=b[15],t=c[0],u=c[1],v=c[2],w=c[3],x=c[4],y=c[5],z=c[6],A=c[7],B=c[8],C=c[9],D=c[10],E=c[11],F=c[12],G=c[13],H=c[14],I=c[15];a[0]=d*t+e*x+f*B+g*F,a[1]=d*u+e*y+f*C+g*G,a[2]=d*v+e*z+f*D+g*H,a[3]=d*w+e*A+f*E+g*I,a[4]=h*t+i*x+j*B+k*F,a[5]=h*u+i*y+j*C+k*G,a[6]=h*v+i*z+j*D+k*H,a[7]=h*w+i*A+j*E+k*I,a[8]=l*t+m*x+n*B+o*F,a[9]=l*u+m*y+n*C+o*G,a[10]=l*v+m*z+n*D+o*H,a[11]=l*w+m*A+n*E+o*I,a[12]=p*t+q*x+r*B+s*F,a[13]=p*u+q*y+r*C+s*G,a[14]=p*v+q*z+r*D+s*H,a[15]=p*w+q*A+r*E+s*I}c.Matrix.prototype={identity:function(){return this.data=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this},multiply:function(a){return b(this.data,this.data,a.data),this},translate:function(a,c,d){return b(this.data,this.data,[1,0,0,0,0,1,0,0,0,0,1,0,a,c,d,1]),this},rotateX:function(c){var d=a(c),e=Math.cos(d),f=Math.sin(d);return b(this.data,this.data,[1,0,0,0,0,e,f,0,0,-f,e,0,0,0,0,1]),this},rotateY:function(c){var d=a(c),e=Math.cos(d),f=Math.sin(d);return b(this.data,this.data,[e,0,-f,0,0,1,0,0,f,0,e,0,0,0,0,1]),this},rotateZ:function(c){var d=a(c),e=Math.cos(d),f=Math.sin(d);return b(this.data,this.data,[e,-f,0,0,f,e,0,0,0,0,1,0,0,0,0,1]),this},scale:function(a,c,d){return b(this.data,this.data,[a,0,0,0,0,c,0,0,0,0,d,0,0,0,0,1]),this}},c.Matrix.multiply=function(a,c){var d=new Float32Array(16);return b(d,a.data,c.data),d},c.Matrix.Perspective=function(a,b,d,e){var f=1/Math.tan(a*(Math.PI/180)/2),g=1/(d-e);return new c.Matrix([f/b,0,0,0,0,f,0,0,0,0,(e+d)*g,-1,0,0,2*e*d*g,0])},c.Matrix.invert3=function(a){var b=a[0],c=a[1],d=a[2],e=a[4],f=a[5],g=a[6],h=a[8],i=a[9],j=a[10],k=j*f-g*i,l=-j*e+g*h,m=i*e-f*h,n=b*k+c*l+d*m;return n?(n=1/n,[k*n,(-j*c+d*i)*n,(g*c-d*f)*n,l*n,(j*b-d*h)*n,(-g*b+d*e)*n,m*n,(-i*b+c*h)*n,(f*b-c*e)*n]):null},c.Matrix.transpose=function(a){return new Float32Array([a[0],a[3],a[6],a[1],a[4],a[7],a[2],a[5],a[8]])},c.Matrix.transform=function(a){var b=a[12],c=a[13],d=a[14],e=a[15];return{x:(b/e+1)/2,y:(c/e+1)/2,z:(d/e+1)/2}},c.Matrix.invert=function(a){var b=new Float32Array(16),c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5],i=a[6],j=a[7],k=a[8],l=a[9],m=a[10],n=a[11],o=a[12],p=a[13],q=a[14],r=a[15],s=c*h-d*g,t=c*i-e*g,u=c*j-f*g,v=d*i-e*h,w=d*j-f*h,x=e*j-f*i,y=k*p-l*o,z=k*q-m*o,A=k*r-n*o,B=l*q-m*p,C=l*r-n*p,D=m*r-n*q,E=s*D-t*C+u*B+v*A-w*z+x*y;if(E)return E=1/E,b[0]=(h*D-i*C+j*B)*E,b[1]=(e*C-d*D-f*B)*E,b[2]=(p*x-q*w+r*v)*E,b[3]=(m*w-l*x-n*v)*E,b[4]=(i*A-g*D-j*z)*E,b[5]=(c*D-e*A+f*z)*E,b[6]=(q*u-o*x-r*t)*E,b[7]=(k*x-m*u+n*t)*E,b[8]=(g*C-h*A+j*y)*E,b[9]=(d*A-c*C-f*y)*E,b[10]=(o*w-p*u+r*s)*E,b[11]=(l*u-k*w-n*s)*E,b[12]=(h*z-g*B-i*y)*E,b[13]=(c*B-d*z+e*y)*E,b[14]=(p*t-o*v-q*s)*E,b[15]=(k*v-l*t+m*s)*E,b}}(),c.texture={disableAll:function(){b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,null)}},c.texture.Image=function(a,c){if(this.id=b.createTexture(),b.bindTexture(b.TEXTURE_2D,this.id),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR_MIPMAP_NEAREST),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,!0),b.bindTexture(b.TEXTURE_2D,null),"string"!=typeof a)this.onLoad(a);else{var d=new Image;d.crossOrigin="*",d.onload=function(){this.onLoad(d),c&&c(d)}.bind(this),d.onerror=function(){c&&c()},d.src=a}},c.texture.Image.prototype={clamp:function(a,b){if(!(a.width<=b&&a.height<=b)){var c=b,d=b,e=a.width/a.height;1>e?c=Math.round(d*e):d=Math.round(c/e);var f=document.createElement("CANVAS");f.width=c,f.height=d;var g=f.getContext("2d");g.drawImage(a,0,0,f.width,f.height),a=f}},onLoad:function(a){return this.clamp(a,128),this.id?(b.bindTexture(b.TEXTURE_2D,this.id),b.texImage2D(b.TEXTURE_2D,0,b.RGBA,b.RGBA,b.UNSIGNED_BYTE,a),b.generateMipmap(b.TEXTURE_2D),b.anisotropyExtension&&b.texParameterf(b.TEXTURE_2D,b.anisotropyExtension.TEXTURE_MAX_ANISOTROPY_EXT,b.anisotropyExtension.maxAnisotropyLevel),void b.bindTexture(b.TEXTURE_2D,null)):void(a=null)},enable:function(a){this.id&&(b.activeTexture(b.TEXTURE0+(a||0)),b.bindTexture(b.TEXTURE_2D,this.id))},destroy:function(){b.bindTexture(b.TEXTURE_2D,null),b.deleteTexture(this.id),this.id=null}},c.texture.Data=function(a,c,d,e){this.id=b.createTexture(),b.bindTexture(b.TEXTURE_2D,this.id),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST);var f=null;if(d){var g=a*c*4;f=new Uint8Array(g),f.set(d.subarray(0,g))}b.texImage2D(b.TEXTURE_2D,0,b.RGBA,a,c,0,b.RGBA,b.UNSIGNED_BYTE,f),b.bindTexture(b.TEXTURE_2D,null)},c.texture.Data.prototype={enable:function(a){b.activeTexture(b.TEXTURE0+(a||0)),b.bindTexture(b.TEXTURE_2D,this.id)},destroy:function(){b.bindTexture(b.TEXTURE_2D,null),b.deleteTexture(this.id),this.id=null}},c.mesh={},c.mesh.addQuad=function(a,b,c,d,e,f){this.addTriangle(a,b,c,d,f),this.addTriangle(a,d,e,b,f)},c.mesh.addTriangle=function(a,b,d,e,f){a.vertices.push(b[0],b[1],b[2],d[0],d[1],d[2],e[0],e[1],e[2]);var g=c.util.calcNormal(b[0],b[1],b[2],d[0],d[1],d[2],e[0],e[1],e[2]);a.normals.push(g[0],g[1],g[2],g[0],g[1],g[2],g[0],g[1],g[2]),a.colors.push(f[0],f[1],f[2],f[3],f[0],f[1],f[2],f[3],f[0],f[1],f[2],f[3])},c.mesh.Triangle=function(a,b){var d={vertices:[],normals:[],colors:[]},e=[-a/2,-a/2,0],f=[a/2,-a/2,0],g=[a/2,a/2,0];c.mesh.addTriangle(d,e,f,g,b),this.vertexBuffer=new c.Buffer(3,new Float32Array(d.vertices)),this.normalBuffer=new c.Buffer(3,new Float32Array(d.normals)),this.colorBuffer=new c.Buffer(4,new Float32Array(d.colors)),this.transform=new c.Matrix},c.mesh.Plane=function(a,b){var d={vertices:[],normals:[],colors:[]},e=[-a/2,-a/2,0],f=[a/2,-a/2,0],g=[a/2,a/2,0],h=[-a/2,a/2,0];c.mesh.addQuad(d,e,f,g,h,b),this.vertexBuffer=new c.Buffer(3,new Float32Array(d.vertices)),this.normalBuffer=new c.Buffer(3,new Float32Array(d.normals)),this.colorBuffer=new c.Buffer(4,new Float32Array(d.colors)),this.transform=new c.Matrix},c.mesh.Cube=function(a,b){var d={vertices:[],normals:[],colors:[]},e=[-a/2,-a/2,-a/2],f=[a/2,-a/2,-a/2],g=[a/2,a/2,-a/2],h=[-a/2,a/2,-a/2],i=[-a/2,-a/2,a/2],j=[a/2,-a/2,a/2],k=[a/2,a/2,a/2],l=[-a/2,a/2,a/2];c.mesh.addQuad(d,e,f,g,h,b),c.mesh.addQuad(d,i,j,k,l,b),c.mesh.addQuad(d,e,f,j,i,b),c.mesh.addQuad(d,f,g,k,j,b),c.mesh.addQuad(d,g,h,l,k,b),c.mesh.addQuad(d,h,e,i,l,b),this.vertexBuffer=new c.Buffer(3,new Float32Array(d.vertices)),this.normalBuffer=new c.Buffer(3,new Float32Array(d.normals)),this.colorBuffer=new c.Buffer(4,new Float32Array(d.colors)),this.transform=new c.Matrix},c}(a)},"function"==typeof define?define([],GLX):"object"==typeof exports?module.exports=GLX:global.GLX=GLX;