class AnimatedParticle extends Phaser.GameObjects.Particles.Particle
{
    constructor (emitter)
    {
        super(emitter);

        this.t = 0;
        this.i = 0;
        this.framesCount = 6;
    }
	
    update (delta, step, processors)
    {
        var result = super.update(delta, step, processors);

        this.t += delta;

        if (this.t >= coinSpinAnim.msPerFrame)
        {
            this.i++;

            if (this.i > this.framesCount-1)
            {
                this.i = 0;
            }

            this.frame = coinSpinAnim.frames[this.i].frame;

            this.t -= coinSpinAnim.msPerFrame;
        }

        return result;
    }
}