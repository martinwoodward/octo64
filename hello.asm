!cpu 6502

; set up basic bootstrapper into 6502 code
* = $0801
!byte $0d,$08,$dc,$07,$9e,$20,$34,$39
!byte $31,$35,$32,$00,$00,$00
* = $c000

; clear the screen
jsr $e544

; write a line of text; loop
.loop
  jsr .write_line
  jmp .loop

; the text to write                                     .
message   !scr "              hello thomas              "

.write_line
  ldx #$00

; load the next character from the message and write it to the screen.
; loop until we've reached 40 characters
.write_char
  lda message,x
  sta $0590,x
  inx
  cpx #$28
  bne .write_char
  rts