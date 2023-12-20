namespace SpriteKind {
    export const p1 = SpriteKind.create()
    export const p2 = SpriteKind.create()
    export const ball = SpriteKind.create()
    export const startPos = SpriteKind.create()
    export const posArrow = SpriteKind.create()
    export const pendots = SpriteKind.create()
}
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Repeated, function () {
    if (penalties < 1) {
        if (spriteutils.distanceBetween(ball, player2) < 10 && resetGoal == 0 && p2Pass == 0) {
            ball.follow(player2, 150)
            sprites.setDataNumber(player2, "num", 5)
            p2Speed = 150
        }
    }
})
controller.player4.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Released, function () {
    if (penalties < 1 && sprites.readDataNumber(player4, "num") == 5) {
        ball.follow(null, 100)
        p4Speed = 200
        pause(100)
        sprites.setDataNumber(player4, "num", 4)
    }
})
sprites.onOverlap(SpriteKind.p1, SpriteKind.ball, function (sprite, otherSprite) {
    if (p1Pass == 1 || (p2Pass == 1 || (p3Pass == 1 || p4Pass == 1))) {
        if (!(sprites.readDataNumber(sprite, "num") == 5)) {
            p1Pass = 0
            p2Pass = 0
            p3Pass = 0
            p4Pass = 0
            ball.follow(null)
        }
    }
    if (p1Hit == 0 && penalties == 0) {
        p1Hit = 1
        ball.startEffect(effects.trail)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 5000, 1, 255, 0, 50, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
        spriteutils.setVelocityAtAngle(otherSprite, spriteutils.angleFrom(sprite, otherSprite), ballSpeed)
        ballSpeed += 3
        if ((team1LastHit == 1 || team1LastHit == 0) && sprite == player1) {
            pause(200)
        } else if ((team1LastHit == 3 || team1LastHit == 0) && sprite == player3) {
            pause(200)
        } else {
        	
        }
        p1Hit = 0
    }
    if (p1Hit == 0 && penalties == 1 && p1Penalty == 1 && resetGoal == 0) {
        p1Hit = 1
        if (sprite == player1) {
            team1LastHit = 1
        } else if (sprite == player3) {
            team1LastHit = 3
        }
        _10penalties += 1
        for (let index = 0; index < 20; index++) {
            ball.startEffect(effects.trail)
        }
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 5000, 1, 255, 0, 50, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
        spriteutils.setVelocityAtAngle(otherSprite, spriteutils.angleFrom(sprite, otherSprite) * penaltyAngle, ballSpeed * penaltyPower)
    }
    if (p1Hit == 0 && penalties == 2 && p2Penalty == 1 && resetGoal == 0) {
        p1Hit = 1
        effects.clearParticles(ball)
        if (team2LastHit == 2 || team2LastHit == 4) {
            team2LastHit = 0
            posArrowP2 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . 1 . 1 . . . . . . . . 
                . . . . . . 1 . . . . . . . . . 
                . . . . . 1 . 1 . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.pendots)
            posArrowP2.setFlag(SpriteFlag.RelativeToCamera, true)
            posArrowP2.setPosition(penGoalListPos2[0], 5)
            penGoalListPos2.shift()
        }
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 5000, 1, 255, 0, 50, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
        spriteutils.setVelocityAtAngle(otherSprite, spriteutils.angleFrom(sprite, otherSprite), ballSpeed * randint(0.1, 1.5))
        if (suddenDeath == 1) {
            P2SudGoal = 0
        }
    }
    if (sprites.readDataNumber(sprite, "num") == 1 && p3Pass == 1) {
        p3Pass = 0
    } else if (sprites.readDataNumber(sprite, "num") == 3 && p1Pass == 1) {
        p1Pass = 0
    }
})
controller.player3.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (penalties < 1) {
        if (spriteutils.distanceBetween(ball, player3) < 15 && (p3Pass == 0 && resetGoal == 0)) {
            p3Pass = 1
            music.play(music.createSoundEffect(WaveShape.Triangle, 948, 2934, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            ball.follow(player1, 400)
        }
    }
})
sprites.onOverlap(SpriteKind.p2, SpriteKind.ball, function (sprite, otherSprite) {
    if (p1Pass == 1 || (p2Pass == 1 || (p3Pass == 1 || p4Pass == 1))) {
        if (!(sprites.readDataNumber(sprite, "num") == 5)) {
            p1Pass = 0
            p2Pass = 0
            p3Pass = 0
            p4Pass = 0
            ball.follow(null)
        }
    }
    if (p2Hit == 0 && penalties == 0) {
        p2Hit = 1
        ball.startEffect(effects.trail)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 5000, 1, 255, 0, 50, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
        spriteutils.setVelocityAtAngle(otherSprite, spriteutils.angleFrom(sprite, otherSprite), ballSpeed)
        ballSpeed += 3
        if ((team2LastHit == 1 || team2LastHit == 0) && sprite == player2) {
            pause(200)
        } else if ((team2LastHit == 3 || team2LastHit == 0) && sprite == player4) {
            pause(200)
        } else {
        	
        }
        p2Hit = 0
    }
    if (p2Hit == 0 && penalties == 2 && p2Penalty == 1 && resetGoal == 0) {
        p2Hit = 1
        if (sprite == player2) {
            team2LastHit = 2
        } else if (sprite == player4) {
            team2LastHit = 4
        }
        _10penalties += 1
        for (let index = 0; index < 20; index++) {
            ball.startEffect(effects.trail)
        }
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 5000, 1, 255, 0, 50, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
        spriteutils.setVelocityAtAngle(otherSprite, spriteutils.angleFrom(sprite, otherSprite) * penaltyAngle, ballSpeed * penaltyPower)
    }
    if (p2Hit == 0 && penalties == 1 && p1Penalty == 1 && resetGoal == 0) {
        p2Hit = 1
        effects.clearParticles(ball)
        if (team1LastHit == 1 || team1LastHit == 3) {
            team1LastHit = 0
            posArrowP1 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . 1 . 1 . . . . . . . . 
                . . . . . . 1 . . . . . . . . . 
                . . . . . 1 . 1 . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.pendots)
            posArrowP1.setFlag(SpriteFlag.RelativeToCamera, true)
            posArrowP1.setPosition(penGoalListPos1[0], 5)
            penGoalListPos1.shift()
        }
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 5000, 1, 255, 0, 50, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
        spriteutils.setVelocityAtAngle(otherSprite, spriteutils.angleFrom(sprite, otherSprite), ballSpeed * randint(0.1, 1.5))
        if (suddenDeath == 1) {
            p1SudGoal = 0
        }
    }
    if (sprites.readDataNumber(sprite, "num") == 2 && p4Pass == 1) {
        p4Pass = 0
    } else if (sprites.readDataNumber(sprite, "num") == 4 && p2Pass == 1) {
        p2Pass = 0
    }
})
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (penalties < 1) {
        if (spriteutils.distanceBetween(ball, player2) < 15 && (p2Pass == 0 && resetGoal == 0)) {
            p2Pass = 1
            music.play(music.createSoundEffect(WaveShape.Triangle, 948, 2934, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            ball.follow(player4, 400)
        }
    }
})
controller.player4.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (penalties < 1) {
        if (spriteutils.distanceBetween(ball, player4) < 15 && (p4Pass == 0 && resetGoal == 0)) {
            p4Pass = 1
            music.play(music.createSoundEffect(WaveShape.Triangle, 948, 2934, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            ball.follow(player2, 400)
        }
    }
})
controller.player4.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Released, function () {
    if (penalties < 1) {
        if (p4Pass == 1 && resetGoal == 0) {
            ball.follow(null)
        }
    }
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Released, function () {
    if (penalties < 1 && sprites.readDataNumber(player2, "num") == 5) {
        ball.follow(null, 100)
        p2Speed = 200
        pause(100)
        sprites.setDataNumber(player2, "num", 2)
    }
})
controller.player3.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Repeated, function () {
    if (penalties < 1) {
        if (spriteutils.distanceBetween(ball, player3) < 10 && resetGoal == 0 && p3Pass == 0) {
            ball.follow(player3, 150)
            sprites.setDataNumber(player3, "num", 5)
            p3Speed = 150
        }
    }
})
sprites.onOverlap(SpriteKind.p1, SpriteKind.p2, function (sprite, otherSprite) {
    if (penalties == 0) {
        if (resetGoal == 0) {
            p1Speed += 3
            p2Speed += 3
            scene.cameraShake(4, 200)
            if (sprites.readDataNumber(sprite, "num") == 5 || sprites.readDataNumber(otherSprite, "num") == 5) {
                ball.follow(null, 100)
            }
            music.play(music.createSoundEffect(WaveShape.Triangle, 5000, 1, 255, 0, 122, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
            spriteutils.setVelocityAtAngle(otherSprite, spriteutils.angleFrom(sprite, otherSprite), 300)
            spriteutils.setVelocityAtAngle(sprite, spriteutils.angleFrom(otherSprite, sprite), 300)
        }
    }
})
controller.player3.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Released, function () {
    if (penalties < 1) {
        if (p3Pass == 1 && resetGoal == 0) {
            ball.follow(null)
        }
    }
})
controller.player3.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Released, function () {
    if (penalties < 1 && sprites.readDataNumber(player3, "num") == 5) {
        ball.follow(null, 100)
        p3Speed = 200
        pause(100)
        sprites.setDataNumber(player3, "num", 3)
    }
})
scene.onHitWall(SpriteKind.ball, function (sprite, location) {
    if (ballHitWall == 0) {
        ballHitWall = 1
        music.play(music.createSoundEffect(WaveShape.Square, 1986, 0, 255, 0, 35, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        hitPoint = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Player)
        tiles.placeOnTile(hitPoint, location)
        hitPoint.setFlag(SpriteFlag.Invisible, true)
        hitPoint.startEffect(effects.halo, 500)
        sprites.destroy(hitPoint)
        if (penalties == 1) {
            goalP1 = 1
            if (team1LastHit == 1 || team1LastHit == 3) {
                team1LastHit = 0
                posArrowP1 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . 1 . 1 . . . . . . . . 
                    . . . . . . 1 . . . . . . . . . 
                    . . . . . 1 . 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.pendots)
                posArrowP1.setFlag(SpriteFlag.RelativeToCamera, true)
                posArrowP1.setPosition(penGoalListPos1[0], 5)
                penGoalListPos1.shift()
            }
            p1SudGoal = 0
        } else if (penalties == 2) {
            goalP2 = 1
            if (team2LastHit == 2 || team2LastHit == 4) {
                team2LastHit = 0
                posArrowP2 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . 1 . 1 . . . . . . . . 
                    . . . . . . 1 . . . . . . . . . 
                    . . . . . 1 . 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.pendots)
                posArrowP2.setFlag(SpriteFlag.RelativeToCamera, true)
                posArrowP2.setPosition(penGoalListPos2[0], 5)
                penGoalListPos2.shift()
            }
            P2SudGoal = 0
        }
        if (ball.vx > 0 && ball.vy > 0) {
            ball.vx += -10
            ball.vy += -10
        } else if (ball.vx < 0 && ball.vy < 0) {
            ball.vx += 10
            ball.vy += 10
        } else if (ball.vx > 0 && ball.vy < 0) {
            ball.vx += -10
            ball.vy += 10
        } else if (ball.vx < 0 && ball.vy > 0) {
            ball.vx += 10
            ball.vy += -10
        }
    }
})
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Released, function () {
    if (penalties < 1) {
        if (p2Pass == 1 && resetGoal == 0) {
            ball.follow(null)
        }
    }
})
controller.player4.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Repeated, function () {
    if (penalties < 1) {
        if (spriteutils.distanceBetween(ball, player4) < 10 && resetGoal == 0 && p4Pass == 0) {
            ball.follow(player4, 150)
            sprites.setDataNumber(player4, "num", 5)
            p4Speed = 150
        }
    }
})
scene.onOverlapTile(SpriteKind.ball, sprites.builtin.forestTiles10, function (sprite, location) {
    if (location.row == 32 && goalP1 == 0 && penalties == 0) {
        music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
        goalP1 = 1
        team2Score += 1
        if (p1Streak == 0) {
            p2Streak += 1
        } else if (p1Streak > 0) {
            p1Streak = 0
            p2Streak += 1
        }
    } else if (location.row == 0 && goalP2 == 0 && penalties == 0) {
        music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
        goalP2 = 1
        team1Score += 1
        if (p2Streak == 0) {
            p1Streak += 1
        } else if (p1Streak > 0) {
            p2Streak = 0
            p1Streak += 1
        }
    }
    if (penalties == 1 || penalties == 2) {
        if (location.row == 0 && (p1Penalty == 1 && goalP1 == 0)) {
            goalP1 = 1
            ball.setVelocity(0, -10)
            if (team1LastHit == 1) {
                team1LastHit = 0
                posArrowP1 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . 2 2 2 . . . . . . . . 
                    . . . . . 2 2 2 . . . . . . . . 
                    . . . . . 2 2 2 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.pendots)
                posArrowP1.setFlag(SpriteFlag.RelativeToCamera, true)
                posArrowP1.setPosition(penGoalListPos1[0], 5)
                penGoalListPos1.shift()
            } else if (team1LastHit == 3) {
                team1LastHit = 0
                posArrow3 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . 5 5 5 . . . . . . . . 
                    . . . . . 5 5 5 . . . . . . . . 
                    . . . . . 5 5 5 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.pendots)
                posArrow3.setFlag(SpriteFlag.RelativeToCamera, true)
                posArrow3.setPosition(penGoalListPos1[0], 5)
                penGoalListPos1.shift()
            }
            music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
            team1Score += 1
            if (suddenDeath == 1) {
                p1SudGoal = 1
            }
        } else if (location.row == 0 && p2Penalty == 1 && goalP2 == 0) {
            goalP2 = 1
            ball.setVelocity(0, -10)
            if (team2LastHit == 2) {
                team2LastHit = 0
                posArrowP2 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . 8 8 8 . . . . . . . . 
                    . . . . . 8 8 8 . . . . . . . . 
                    . . . . . 8 8 8 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.pendots)
                posArrowP2.setFlag(SpriteFlag.RelativeToCamera, true)
                posArrowP2.setPosition(penGoalListPos2[0], 5)
                penGoalListPos2.shift()
            } else if (team2LastHit == 4) {
                team2LastHit = 0
                posArrow4 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . 7 7 7 . . . . . . . . 
                    . . . . . 7 7 7 . . . . . . . . 
                    . . . . . 7 7 7 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.pendots)
                posArrow4.setFlag(SpriteFlag.RelativeToCamera, true)
                posArrow4.setPosition(penGoalListPos2[0], 5)
                penGoalListPos2.shift()
            }
            music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
            team2Score += 1
            if (suddenDeath == 1) {
                P2SudGoal = 1
            }
        }
    }
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Repeated, function () {
    if (penalties < 1) {
        if (spriteutils.distanceBetween(ball, player1) < 10 && resetGoal == 0 && p1Pass == 0) {
            ball.follow(player1, 150)
            sprites.setDataNumber(player1, "num", 5)
            p1Speed = 150
        }
    }
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (penalties < 1) {
        if (spriteutils.distanceBetween(ball, player1) < 15 && (p1Pass == 0 && resetGoal == 0)) {
            p1Pass = 1
            music.play(music.createSoundEffect(WaveShape.Triangle, 948, 2934, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            ball.follow(player3, 400)
        }
    }
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Released, function () {
    if (penalties < 1 && sprites.readDataNumber(player1, "num") == 5) {
        ball.follow(null, 100)
        p1Speed = 200
        pause(100)
        sprites.setDataNumber(player1, "num", 1)
    }
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Released, function () {
    if (penalties < 1) {
        if (p1Pass == 1 && resetGoal == 0) {
            ball.follow(null)
        }
    }
})
let cover2: Sprite = null
let cover1: Sprite = null
let sDCheck = 0
let penaltyFight = 0
let penaltyTurn = 0
let posP4Active = 0
let posP3Active = 0
let posP2Active = 0
let posP1Active = 0
let scoreCreated = 0
let posArrow4: Sprite = null
let posArrow3: Sprite = null
let p2Streak = 0
let p1Streak = 0
let goalP2 = 0
let goalP1 = 0
let hitPoint: Sprite = null
let ballHitWall = 0
let p1SudGoal = 0
let posArrowP1: Sprite = null
let p2Hit = 0
let P2SudGoal = 0
let suddenDeath = 0
let posArrowP2: Sprite = null
let team2LastHit = 0
let p2Penalty = 0
let penaltyPower = 0
let penaltyAngle = 0
let _10penalties = 0
let p1Penalty = 0
let team1LastHit = 0
let p1Hit = 0
let p4Pass = 0
let p3Pass = 0
let p1Pass = 0
let p2Pass = 0
let resetGoal = 0
let ball: Sprite = null
let player4: Sprite = null
let player3: Sprite = null
let player2: Sprite = null
let player1: Sprite = null
let p4Speed = 0
let p3Speed = 0
let p2Speed = 0
let ballSpeed = 0
let p1Speed = 0
let normalPro = 0
let penalties = 0
let penGoalListPos2: number[] = []
let penGoalListPos1: number[] = []
penGoalListPos1 = [
5,
10,
15,
20,
25
]
penGoalListPos2 = [
158,
153,
148,
143,
138
]
penalties = 10
story.showPlayerChoices("Fast", "Free")
if (story.checkLastAnswer("Fast")) {
    normalPro = 1
}
scene.setBackgroundImage(img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ...............................................................................1................................................................................
    ..............................................................................111...............................................................................
    .............................................................................1.1.1..............................................................................
    ..............222222222..................555555555..........................1..1..1........................888888888.................777777777..................
    .............22222222222................55555555555............................1..........................88888888888...............77777777777.................
    ............2222222222222..............5555555555555...........................1.........................8888888888888.............7777777777777................
    ...........222222222222222............555555555555555..........................1........................888888888888888...........777777777777777...............
    ..........22222222222222222..........55555555555555555..................1......1......1................88888888888888888.........77777777777777777..............
    ..........22222222222222222..........55555555555555555.................1.......1.......1...............88888888888888888.........77777777777777777..............
    ..........22222222222222222..........55555555555555555................1........1........1..............88888888888888888.........77777777777777777..............
    ..........22222222222222222..........55555555555555555...............11111111.....11111111.............88888888888888888.........77777777777777777..............
    ..........22222222222222222..........55555555555555555................1.................1..............88888888888888888.........77777777777777777..............
    ..........22222222222222222..........55555555555555555.................1.......1.......1...............88888888888888888.........77777777777777777..............
    ..........22222222222222222..........55555555555555555..................1......1......1................88888888888888888.........77777777777777777..............
    ..........22222222222222222..........55555555555555555.........................1.......................88888888888888888.........77777777777777777..............
    ..........22222222222222222..........55555555555555555.........................1.......................88888888888888888.........77777777777777777..............
    ...........222222222222222............555555555555555..........................1........................888888888888888...........777777777777777...............
    ............2222222222222..............5555555555555........................1..1..1......................8888888888888.............7777777777777................
    .............22222222222................55555555555..........................1.1.1........................88888888888...............77777777777.................
    ..............222222222..................555555555............................111..........................888888888.................777777777..................
    ...............................................................................1................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................111..........................................................11111111111........................................................
    ...............................1111..........................................................111111111111.......................................................
    ...............................11111.........................................................1111111111111......................................................
    ...............................11111.....................4444444.............................111.......1111................4444444..............................
    ...............................11.11...................44444444444...........................111........111..............44444f44444............................
    ..............................111.111.................4444444444444..........................111........111.............44444fff44444...........................
    .............................111...11.................4444444444444..........................111........111.............4444f4f4f4444...........................
    .............................11....111...............444444444444444.........................111.......1111............4444444f4444444..........................
    ............................111....111...............444444444444444.........................111......1111.............4444444f4444444..........................
    ............................111....111......111111...444444444444444.........................111.....1111.....111111...4444444f4444444..........................
    ............................1111111111...............444444444444444.........................111111111111..............444444444444444..........................
    ............................11111111111.....111111...444444444444444.........................111111111111.....111111...444444444444444..........................
    ...........................111.......11..............4444444f4444444.........................111......1111.............444444444444444..........................
    ..........................111........111.............4444444f4444444.........................111.......1111............444444444444444..........................
    ..........................11..........11..............4444fffff4444..........................111........111.............4444444444444...........................
    .........................111..........11..............444444f444444..........................111........111.............4444444444444...........................
    .........................111..........111..............44444f44444...........................111........111..............44444444444............................
    .........................111..........111................4444444.............................111.......1111................4444444..............................
    ........................111...........1111...................................................1111111111111......................................................
    ........................111............111...................................................111111111111.......................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    `)
music.play(music.createSong(hex`0078000408020205001c000f0a006400f4010a0000040000000000000000000000000000000002190008000c00010f18001c00010d28002c00010f38003c00020d1409010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800600000000100010e04000500010b08000900010e0c000d00010b10001100010e14001500010b18001900010e1c001d00010b20002100010e24002500010b28002900010e2c002d00010b30003100010e34003500010b38003900010e3c003d00010b`), music.PlaybackMode.LoopingInBackground)
game.splash("ClashBall")
music.stopAllSounds()
scene.setBackgroundImage(img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    `)
p1Speed = 200
ballSpeed = 100
penalties = 0
p2Speed = 200
p3Speed = 200
p4Speed = 200
tiles.setCurrentTilemap(tilemap`level1`)
player1 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . 2 2 2 2 2 2 2 . . . . . 
    . . . 2 2 2 2 2 2 2 2 2 . . . . 
    . . 2 2 2 2 2 2 2 2 2 2 2 . . . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . . 2 2 2 2 2 2 2 2 2 2 2 . . . 
    . . . 2 2 2 2 2 2 2 2 2 . . . . 
    . . . . 2 2 2 2 2 2 2 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.p1)
let p1Startpos = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.startPos)
tiles.placeOnTile(player1, tiles.getTileLocation(7, 18))
tiles.placeOnTile(p1Startpos, tiles.getTileLocation(7, 18))
p1Startpos.setFlag(SpriteFlag.Invisible, true)
sprites.setDataNumber(player1, "num", 1)
player2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . 8 8 8 8 8 8 8 . . . . . 
    . . . 8 8 8 8 8 8 8 8 8 . . . . 
    . . 8 8 8 8 8 8 8 8 8 8 8 . . . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 . . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 . . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 . . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 . . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 . . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 . . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 . . 
    . . 8 8 8 8 8 8 8 8 8 8 8 . . . 
    . . . 8 8 8 8 8 8 8 8 8 . . . . 
    . . . . 8 8 8 8 8 8 8 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.p2)
let p2StartPos = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.startPos)
p2StartPos.setFlag(SpriteFlag.Invisible, true)
tiles.placeOnTile(player2, tiles.getTileLocation(7, 14))
tiles.placeOnTile(p2StartPos, tiles.getTileLocation(7, 14))
sprites.setDataNumber(player2, "num", 2)
player3 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . 5 5 5 5 5 5 5 . . . . . 
    . . . 5 5 5 5 5 5 5 5 5 . . . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 . . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 . . . 
    . . . 5 5 5 5 5 5 5 5 5 . . . . 
    . . . . 5 5 5 5 5 5 5 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.p1)
let p3StartPos = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.startPos)
tiles.placeOnTile(player3, tiles.getTileLocation(9, 18))
tiles.placeOnTile(p3StartPos, tiles.getTileLocation(9, 18))
p3StartPos.setFlag(SpriteFlag.Invisible, true)
sprites.setDataNumber(player3, "num", 3)
player4 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . 7 7 7 7 7 7 7 . . . . . 
    . . . 7 7 7 7 7 7 7 7 7 . . . . 
    . . 7 7 7 7 7 7 7 7 7 7 7 . . . 
    . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 
    . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 
    . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 
    . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 
    . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 
    . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 
    . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 
    . . 7 7 7 7 7 7 7 7 7 7 7 . . . 
    . . . 7 7 7 7 7 7 7 7 7 . . . . 
    . . . . 7 7 7 7 7 7 7 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.p2)
let p4StartPos = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.startPos)
tiles.placeOnTile(player4, tiles.getTileLocation(9, 14))
tiles.placeOnTile(p4StartPos, tiles.getTileLocation(9, 14))
p4StartPos.setFlag(SpriteFlag.Invisible, true)
sprites.setDataNumber(player3, "num", 4)
ball = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 4 4 4 4 4 4 . . . . . 
    . . . . 4 4 4 4 4 4 4 4 . . . . 
    . . . . 4 4 4 4 4 4 4 4 . . . . 
    . . . . 4 4 4 4 4 4 4 4 . . . . 
    . . . . 4 4 4 4 4 4 4 4 . . . . 
    . . . . 4 4 4 4 4 4 4 4 . . . . 
    . . . . 4 4 4 4 4 4 4 4 . . . . 
    . . . . . 4 4 4 4 4 4 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.ball)
let ballStartPos = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.startPos)
ballStartPos.setFlag(SpriteFlag.Invisible, true)
tiles.placeOnTile(ball, tiles.getTileLocation(8, 16))
tiles.placeOnTile(ballStartPos, tiles.getTileLocation(8, 16))
ball.y += -1
scene.cameraFollowSprite(ball)
player1.setBounceOnWall(true)
player2.setBounceOnWall(true)
player3.setBounceOnWall(true)
player4.setBounceOnWall(true)
ball.setBounceOnWall(true)
if (normalPro == 1) {
    player1.setStayInScreen(true)
    player2.setStayInScreen(true)
    player3.setStayInScreen(true)
    player4.setStayInScreen(true)
} else {
	
}
let team1Score = 0
let team2Score = 0
let time = textsprite.create("test", 0, 1)
let _1label = textsprite.create("10", 5, 2)
let _2label = textsprite.create("10", 7, 8)
_1label.setPosition(6, 4)
_2label.setPosition(160, 4)
_1label.setFlag(SpriteFlag.RelativeToCamera, true)
_2label.setFlag(SpriteFlag.RelativeToCamera, true)
let gametime = 90
let timeUp = 2
music.play(music.createSoundEffect(WaveShape.Square, 1690, 1726, 255, 100, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
forever(function () {
    if (timeUp == 9) {
        _1label.setText(convertToText(team1Score))
        _2label.setText(convertToText(team2Score))
    }
    if (timeUp == 2) {
        if (scoreCreated == 0) {
            scoreCreated = 1
        }
        time.setText(convertToText(spriteutils.roundWithPrecision(gametime, 2)))
        time.setFlag(SpriteFlag.RelativeToCamera, true)
        time.setPosition(80, 5)
        _1label.setText(convertToText(team1Score))
        _2label.setText(convertToText(team2Score))
        if (resetGoal == 1) {
            gametime = gametime
        } else {
            gametime += -0.025
        }
        if (gametime < 0) {
            gametime = 0
            timeUp = 1
            resetGoal = 1
            sprites.destroy(time)
        }
    }
    if (timeUp == 1) {
        scene.cameraShake(6, 1000)
        if (team1Score > team2Score) {
            game.setGameOverPlayable(true, music.createSoundEffect(WaveShape.Triangle, 1690, 2964, 255, 100, 750, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), false)
            game.setGameOverMessage(true, "Red/Yellow Wins : " + ("" + team1Score + " - " + team2Score))
            game.setGameOverEffect(true, effects.confetti)
            game.gameOver(true)
        } else if (team1Score < team2Score) {
            game.setGameOverPlayable(true, music.createSoundEffect(WaveShape.Triangle, 1690, 2964, 255, 100, 750, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), false)
            game.setGameOverMessage(true, "Blue/Green Wins : " + ("" + team2Score + " - " + team1Score))
            game.setGameOverEffect(true, effects.confetti)
            game.gameOver(true)
        } else if (team1Score == team2Score) {
            timeUp = 9
            music.play(music.createSoundEffect(WaveShape.Square, 1690, 1726, 255, 100, 400, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            game.splash("DRAW!")
            music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8004e0000000100010e08000900010e0c000d00010a10001100010e18001900010e1c001d00010a20002100010e28002900010e2a002b00010a2c002d00010a30003100010e38003900010e3c003d00010a`), music.PlaybackMode.LoopingInBackground)
            game.splash("PENALTIES!")
            penalties = 3
            music.stopAllSounds()
        }
    }
})
forever(function () {
    if (penalties == 0) {
        if (resetGoal == 0) {
            controller.player1.moveSprite(player1, p1Speed, p1Speed)
            controller.player2.moveSprite(player2, p2Speed, p2Speed)
            controller.player3.moveSprite(player3, p3Speed, p3Speed)
            controller.player4.moveSprite(player4, p4Speed, p4Speed)
        }
        if (ballHitWall == 1) {
            pause(200)
            ballHitWall = 0
        }
        if (goalP1 == 1) {
            resetGoal = 1
            controller.player1.moveSprite(player1, 0, 0)
            controller.player2.moveSprite(player2, 0, 0)
            controller.player3.moveSprite(player3, 0, 0)
            controller.player4.moveSprite(player4, 0, 0)
            for (let index = 0; index < 5; index++) {
                ball.scale += -0.2
                pause(20)
            }
            ball.setVelocity(0, 0)
            pause(1000)
            p1Hit = 1
            p2Hit = 1
            ball.follow(ballStartPos, 200)
            effects.clearParticles(ball)
            pause(100)
            p1Speed = 0
            p2Speed = 0
            p3Speed = 0
            p4Speed = 0
            player1.follow(p1Startpos, 300)
            player2.follow(p2StartPos, 300)
            player3.follow(p3StartPos, 300)
            player4.follow(p4StartPos, 300)
            ballSpeed = 100
            for (let index = 0; index < 20; index++) {
                ball.scale += 0.05
                pause(20)
            }
            pause(1200)
            scene.cameraShake(2, 200)
            ball.y += -1
            p1Hit = 0
            p2Hit = 0
            p1Speed = 200
            p2Speed = 200
            p3Speed = 200
            p4Speed = 200
            resetGoal = 0
            goalP1 = 0
            p1Pass = 0
            p2Pass = 0
            p3Pass = 0
            p4Pass = 0
            ball.follow(null, 200)
            player1.follow(null, 200)
            player2.follow(null, 200)
            player3.follow(null, 200)
            player4.follow(null, 200)
            music.play(music.createSoundEffect(WaveShape.Square, 1808, 1756, 255, 0, 250, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        }
        if (goalP2 == 1) {
            resetGoal = 1
            controller.player1.moveSprite(player1, 0, 0)
            controller.player2.moveSprite(player2, 0, 0)
            controller.player3.moveSprite(player3, 0, 0)
            controller.player4.moveSprite(player4, 0, 0)
            for (let index = 0; index < 5; index++) {
                ball.scale += -0.2
                pause(20)
            }
            ball.setVelocity(0, 0)
            pause(1000)
            p1Hit = 1
            p2Hit = 1
            ball.follow(ballStartPos, 200)
            effects.clearParticles(ball)
            pause(100)
            p1Speed = 0
            p2Speed = 0
            p3Speed = 0
            p4Speed = 0
            player1.follow(p1Startpos, 300)
            player2.follow(p2StartPos, 300)
            player3.follow(p3StartPos, 300)
            player4.follow(p4StartPos, 300)
            ballSpeed = 100
            for (let index = 0; index < 20; index++) {
                ball.scale += 0.05
                pause(20)
            }
            pause(1200)
            ball.y += -1
            scene.cameraShake(2, 200)
            p1Hit = 0
            p2Hit = 0
            p1Speed = 200
            p2Speed = 200
            p3Speed = 200
            p4Speed = 200
            goalP2 = 0
            resetGoal = 0
            p1Pass = 0
            p2Pass = 0
            p3Pass = 0
            p4Pass = 0
            ball.follow(null, 200)
            player1.follow(null, 200)
            player2.follow(null, 200)
            player3.follow(null, 200)
            player4.follow(null, 200)
            music.play(music.createSoundEffect(WaveShape.Square, 1808, 1756, 255, 0, 250, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        }
    }
    if (spriteutils.distanceBetween(player1, ball) > 80 && posP1Active == 0) {
        posP1Active = 1
        posArrowP1 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 . . . . . . . . 
            . . . . . 2 2 2 . . . . . . . . 
            . . . . . 2 2 2 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.posArrow)
        posArrowP1.setPosition(player1.x, player1.y)
        posArrowP1.setStayInScreen(true)
        posArrowP1.follow(player1, 500)
    }
    if (spriteutils.distanceBetween(player2, ball) > 80 && posP2Active == 0) {
        posP2Active = 1
        posArrowP2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 8 8 8 . . . . . . . . 
            . . . . . 8 8 8 . . . . . . . . 
            . . . . . 8 8 8 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.posArrow)
        posArrowP2.setPosition(player2.x, player2.y)
        posArrowP2.setStayInScreen(true)
        posArrowP2.follow(player2, 500)
    }
    if (spriteutils.distanceBetween(player1, ball) < 90 && posP1Active == 1) {
        posP1Active = 0
        sprites.destroy(posArrowP1, effects.disintegrate, 100)
    }
    if (spriteutils.distanceBetween(player2, ball) < 90 && posP2Active == 1) {
        posP2Active = 0
        sprites.destroy(posArrowP2, effects.disintegrate, 100)
    }
    if (spriteutils.distanceBetween(player3, ball) > 80 && posP3Active == 0) {
        posP3Active = 1
        posArrow3 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 5 5 5 . . . . . . . . 
            . . . . . 5 5 5 . . . . . . . . 
            . . . . . 5 5 5 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.posArrow)
        posArrow3.setPosition(player3.x, player3.y)
        posArrow3.setStayInScreen(true)
        posArrow3.follow(player3, 500)
    }
    if (spriteutils.distanceBetween(player4, ball) > 80 && posP4Active == 0) {
        posP4Active = 1
        posArrow4 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 7 7 7 . . . . . . . . 
            . . . . . 7 7 7 . . . . . . . . 
            . . . . . 7 7 7 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.posArrow)
        posArrow4.setPosition(player4.x, player4.y)
        posArrow4.setStayInScreen(true)
        posArrow4.follow(player4, 500)
    }
    if (spriteutils.distanceBetween(player3, ball) < 90 && posP3Active == 1) {
        posP3Active = 0
        sprites.destroy(posArrow3, effects.disintegrate, 100)
    }
    if (spriteutils.distanceBetween(player4, ball) < 90 && posP4Active == 1) {
        posP4Active = 0
        sprites.destroy(posArrow4, effects.disintegrate, 100)
    }
    if (p1Streak >= 3) {
        player1.startEffect(effects.fire, 9000)
        player3.startEffect(effects.fire, 9000)
        p1Streak = 0
        music.play(music.createSoundEffect(WaveShape.Noise, 3312, 3567, 0, 163, 1000, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    }
    if (p2Streak >= 3) {
        player2.startEffect(effects.fire, 9000)
        player4.startEffect(effects.fire, 9000)
        p2Streak = 0
        music.play(music.createSoundEffect(WaveShape.Noise, 3312, 3567, 0, 163, 1000, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    }
    if (penalties == 3) {
        resetGoal = 1
        sprites.destroy(_1label, effects.fire, 1000)
        sprites.destroy(_2label, effects.fire, 1000)
        controller.player1.moveSprite(player1, 0, 0)
        controller.player2.moveSprite(player2, 0, 0)
        controller.player3.moveSprite(player3, 0, 0)
        controller.player4.moveSprite(player4, 0, 0)
        tiles.setTileAt(tiles.getTileLocation(5, 0), assets.tile`myTile17`)
        tiles.setTileAt(tiles.getTileLocation(11, 0), assets.tile`myTile16`)
        effects.clearParticles(ball)
        team1Score = 0
        team2Score = 0
        scene.cameraFollowSprite(ball)
        tiles.placeOnTile(p1Startpos, tiles.getTileLocation(8, 7))
        tiles.placeOnTile(p2StartPos, tiles.getTileLocation(8, 1))
        tiles.placeOnTile(p3StartPos, tiles.getTileLocation(2, 1))
        tiles.placeOnTile(p4StartPos, tiles.getTileLocation(15, 1))
        tiles.placeOnTile(ballStartPos, tiles.getTileLocation(8, 3))
        ballStartPos.y += 7
        ballStartPos.x += 0
        player1.follow(p1Startpos, 150)
        player2.follow(p2StartPos, 150)
        player3.follow(p3StartPos, 150)
        player4.follow(p4StartPos, 150)
        ball.follow(ballStartPos, 150)
        ball.setStayInScreen(true)
        pause(4000)
        scene.cameraFollowSprite(null)
        player1.follow(null, 300)
        player2.follow(null, 300)
        player3.follow(null, 300)
        player4.follow(null, 300)
        ball.follow(null, 300)
        resetGoal = 0
        ballSpeed = 300
        penalties = 1
        p1Penalty = 1
        p2Penalty = 0
        penaltyTurn = 1
        music.play(music.createSoundEffect(WaveShape.Square, 1690, 1726, 255, 100, 750, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (penalties == 1 && penaltyFight == 0) {
        if (penaltyTurn == 1) {
            controller.player1.moveSprite(player1, 150, 250)
            controller.player2.moveSprite(player2, 300, 0)
            controller.player3.moveSprite(player3, 0, 0)
            controller.player4.moveSprite(player4, 0, 0)
            penaltyPower = randint(0.9, 1.1)
            penaltyAngle = randint(0.9, 1.1)
        } else if (penaltyTurn == 3) {
            controller.player1.moveSprite(player1, 0, 0)
            controller.player2.moveSprite(player2, 0, 0)
            controller.player3.moveSprite(player3, 150, 250)
            controller.player4.moveSprite(player4, 300, 0)
            penaltyPower = randint(0.9, 1.1)
            penaltyAngle = randint(0.9, 1.1)
        }
    }
    if (penalties == 2 && penaltyFight == 0) {
        if (penaltyTurn == 2) {
            controller.player1.moveSprite(player1, 300, 0)
            controller.player2.moveSprite(player2, 150, 250)
            controller.player3.moveSprite(player3, 0, 0)
            controller.player4.moveSprite(player4, 0, 0)
            penaltyPower = randint(0.9, 1.1)
            penaltyAngle = randint(0.9, 1.1)
        } else if (penaltyTurn == 4) {
            controller.player1.moveSprite(player1, 0, 0)
            controller.player2.moveSprite(player2, 0, 0)
            controller.player3.moveSprite(player3, 300, 0)
            controller.player4.moveSprite(player4, 150, 250)
            penaltyPower = randint(0.9, 1.1)
            penaltyAngle = randint(0.9, 1.1)
        }
    }
    if (goalP1 == 1 && penalties > 0) {
        resetGoal = 1
        penaltyTurn = penaltyTurn + 1
        pause(1000)
        effects.clearParticles(ball)
        controller.player1.moveSprite(player1, 0, 0)
        controller.player2.moveSprite(player2, 0, 0)
        controller.player3.moveSprite(player3, 0, 0)
        controller.player4.moveSprite(player4, 0, 0)
        if (penaltyTurn == 2) {
            player1.follow(p2StartPos, 100)
            player2.follow(p1Startpos, 100)
            player3.follow(p3StartPos, 100)
            player4.follow(p4StartPos, 100)
        } else if (penaltyTurn == 4) {
            player1.follow(p3StartPos, 100)
            player2.follow(p4StartPos, 100)
            player3.follow(p2StartPos, 100)
            player4.follow(p1Startpos, 100)
        }
        ball.follow(ballStartPos, 100)
        pause(2000)
        player1.follow(null, 300)
        player2.follow(null, 300)
        player3.follow(null, 300)
        player4.follow(null, 300)
        ball.follow(null, 300)
        goalP1 = 0
        p1Hit = 0
        p2Hit = 0
        p2Penalty = 1
        p1Penalty = 0
        resetGoal = 0
        penalties = 2
        penaltyFight = 0
        music.play(music.createSoundEffect(WaveShape.Square, 1690, 1726, 255, 100, 400, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        if (_10penalties == 10) {
            _10penalties += 1
        }
    }
    if (goalP2 == 1 && penalties > 0) {
        resetGoal = 1
        if (penaltyTurn == 4) {
            penaltyTurn = 0
        }
        penaltyTurn = penaltyTurn + 1
        pause(1000)
        effects.clearParticles(ball)
        controller.player1.moveSprite(player1, 0, 0)
        controller.player2.moveSprite(player2, 0, 0)
        controller.player3.moveSprite(player3, 0, 0)
        controller.player4.moveSprite(player4, 0, 0)
        if (penaltyTurn == 1) {
            player1.follow(p1Startpos, 100)
            player2.follow(p2StartPos, 100)
            player3.follow(p3StartPos, 100)
            player4.follow(p4StartPos, 100)
        } else if (penaltyTurn == 3) {
            player1.follow(p3StartPos, 100)
            player2.follow(p4StartPos, 100)
            player3.follow(p1Startpos, 100)
            player4.follow(p2StartPos, 100)
        }
        ball.follow(ballStartPos, 100)
        pause(2000)
        player1.follow(null, 300)
        player2.follow(null, 300)
        player3.follow(null, 300)
        player4.follow(null, 300)
        ball.follow(null, 300)
        music.play(music.createSoundEffect(WaveShape.Square, 1690, 1726, 255, 100, 400, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        goalP2 = 0
        p1Hit = 0
        p2Hit = 0
        resetGoal = 0
        p2Penalty = 0
        p1Penalty = 1
        penalties = 1
        penaltyFight = 0
        if (_10penalties == 10) {
            _10penalties += 1
        }
        if (suddenDeath == 1) {
            sDCheck = 1
        }
    }
    if (resetGoal == 0 && ((p1Hit == 1 || p2Hit == 1) && (ball.y > 70 || ball.x < 80 || ball.x > 200))) {
        if (penalties == 1) {
            goalP1 = 1
            if (team1LastHit == 1 || team1LastHit == 3) {
                team1LastHit = 0
                posArrowP1 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . 1 . 1 . . . . . . . . 
                    . . . . . . 1 . . . . . . . . . 
                    . . . . . 1 . 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.pendots)
                posArrowP1.setFlag(SpriteFlag.RelativeToCamera, true)
                posArrowP1.setPosition(penGoalListPos1[0], 5)
                penGoalListPos1.shift()
            }
            p1SudGoal = 0
        } else if (penalties == 2) {
            goalP2 = 1
            if (team2LastHit == 2 || team2LastHit == 4) {
                team2LastHit = 0
                posArrowP1 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . 1 . 1 . . . . . . . . 
                    . . . . . . 1 . . . . . . . . . 
                    . . . . . 1 . 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.pendots)
                posArrowP1.setFlag(SpriteFlag.RelativeToCamera, true)
                posArrowP1.setPosition(penGoalListPos2[0], 5)
                penGoalListPos2.shift()
            }
            P2SudGoal = 0
        }
    }
    if (penalties > 0 && suddenDeath == 0) {
        if (team1Score >= 3 && team1Score >= team2Score + 3 && _10penalties > 5) {
            game.setGameOverPlayable(true, music.createSoundEffect(WaveShape.Square, 1690, 1726, 255, 100, 750, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), false)
            game.setGameOverMessage(true, "Red/Yellow Wins!")
            game.setGameOverEffect(true, effects.confetti)
            game.gameOver(true)
        } else if (team2Score >= 3 && team2Score >= team1Score + 3 && _10penalties > 5) {
            game.setGameOverPlayable(true, music.createSoundEffect(WaveShape.Square, 1690, 1726, 255, 100, 750, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), false)
            game.setGameOverMessage(true, "Blue/Green Wins!")
            game.setGameOverEffect(true, effects.confetti)
            game.gameOver(true)
        }
        if (_10penalties == 11) {
            if (team1Score > team2Score) {
                game.setGameOverPlayable(true, music.createSoundEffect(WaveShape.Square, 1, 1726, 255, 100, 750, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), false)
                game.setGameOverMessage(true, "Red/Yellow Wins!")
                game.setGameOverEffect(true, effects.confetti)
                game.gameOver(true)
            } else if (team1Score < team2Score) {
                game.setGameOverPlayable(true, music.createSoundEffect(WaveShape.Square, 1, 1726, 255, 100, 750, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), false)
                game.setGameOverMessage(true, "Blue/Green Wins!")
                game.setGameOverEffect(true, effects.confetti)
                game.gameOver(true)
            } else if (team1Score == team2Score) {
                music.play(music.createSoundEffect(WaveShape.Square, 1690, 1726, 255, 100, 750, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                music.play(music.createSong(hex`008c000408020205001c000f0a006400f4010a000004000000000000000000000000000000000206003c004000012408001c000e050046006603320000040a002d00000064001400013200020100023c0000000400010508000c00010510001400010814001800010818001c00010820002400010524002800010530003400010834003800010638003c000108`), music.PlaybackMode.LoopingInBackground)
                game.splash("SUDDEN DEATH!")
                music.stopAllSounds()
                cover1 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    a a a a a a a a a a a a a a a a 
                    a a a a a a a a a a a a a a a a 
                    a a a a a a a a a a a a a a a a 
                    a a a a a a a a a a a a a a a a 
                    a a a a a a a a a a a a a a a a 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.Crosshair)
                cover1.setFlag(SpriteFlag.RelativeToCamera, true)
                cover1.sx = 2.5
                cover1.setPosition(15, 5)
                cover2 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    a a a a a a a a a a a a a a a a 
                    a a a a a a a a a a a a a a a a 
                    a a a a a a a a a a a a a a a a 
                    a a a a a a a a a a a a a a a a 
                    a a a a a a a a a a a a a a a a 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.Crosshair)
                cover2.setFlag(SpriteFlag.RelativeToCamera, true)
                cover2.sx = 2.5
                cover2.setPosition(145, 5)
                penGoalListPos1 = [
                5,
                10,
                15,
                20,
                25
                ]
                penGoalListPos2 = [
                158,
                153,
                148,
                143,
                138
                ]
                _10penalties = 12
                suddenDeath = 1
                team1Score = 0
                team2Score = 0
                goalP2 = 1
                penaltyTurn = 0
            }
        }
    }
    if (suddenDeath == 1 && sDCheck == 1) {
        if (p1SudGoal == 1 && P2SudGoal == 0) {
            game.setGameOverPlayable(true, music.createSoundEffect(WaveShape.Square, 285, 1726, 255, 100, 750, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), false)
            game.setGameOverMessage(true, "Red/Yellow Wins!")
            game.setGameOverEffect(true, effects.confetti)
            game.gameOver(true)
        } else if (p1SudGoal == 0 && P2SudGoal == 1) {
            game.setGameOverPlayable(true, music.createSoundEffect(WaveShape.Square, 454, 1726, 255, 100, 750, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), false)
            game.setGameOverMessage(true, "Blue/Green Wins!")
            game.setGameOverEffect(true, effects.confetti)
            game.gameOver(true)
        } else {
            sDCheck = 0
        }
    }
})
