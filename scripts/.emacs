(custom-set-variables
  ;; custom-set-variables was added by Custom.
  ;; If you edit it by hand, you could mess it up, so be careful.
  ;; Your init file should contain only one such instance.
  ;; If there is more than one, they won't work right.
 )
;;(custom-set-faces
  ;; custom-set-faces was added by Custom.
  ;; If you edit it by hand, you could mess it up, so be careful.
  ;; Your init file should contain only one such instance.
  ;; If there is more than one, they won't work right.
;; '(default ((t (:inherit nil :stipple nil :background "white" :foreground "black" :inverse-video nil :box nil :strike-through nil :overline nil :underline nil :slant normal :weight normal :height 145 :width normal :foundry "misc" :family "fixed")))))

;;Make searches case sensitive by default (in all buffers that do not override this). 
(setq-default case-fold-search nil)

;;all indentation  can be made from spaces only
(setq-default indent-tabs-mode nil)

;;Cedit settings
;;(load-file "~/bin/cedet-1.0pre7/common/cedet.el")

;; Enable EDE (Project Management) features
;;(global-ede-mode 1)

;; Enable EDE for a pre-existing C++ project
;;(ede-cpp-root-project "dlna" :file "/vobs/motocap_base/network/dlna/Makefile")

;; Enabling Semantic (code-parsing, smart completion) features
;; Select one of the following:

;; * This enables the database and idle reparse engines
;;(semantic-load-enable-minimum-features)

;; * This enables some tools useful for coding, such as summary mode
;;   imenu support, and the semantic navigator
;;(semantic-load-enable-code-helpers)

;; * This enables even more coding tools such as intellisense mode
;;   decoration mode, and stickyfunc mode (plus regular code helpers)
;; (semantic-load-enable-gaudy-code-helpers)

;; * This enables the use of Exuberent ctags if you have it installed.
;;   If you use C++ templates or boost, you should NOT enable it.
;; (semantic-load-enable-all-exuberent-ctags-support)
;;   Or, use one of these two types of support.
;;   Add support for new languges only via ctags.
;; (semantic-load-enable-primary-exuberent-ctags-support)
;;   Add support for using ctags as a backup parser.
;; (semantic-load-enable-secondary-exuberent-ctags-support)

;; Enable SRecode (Template management) minor-mode.
;; (global-srecode-minor-mode 1)

;;(require 'semantic-ia)
;;(require 'semantic-gcc)

;;(semantic-add-system-include "~/exp/include/boost_1_37" 'c++-mode)

;; (defun my-semantic-hook ()
;;   (imenu-add-to-menubar "TAGS"))
;; (add-hook 'semantic-init-hooks 'my-semantic-hook)

;; ;; если вы хотите включить поддержку gnu global
;; (require 'semanticdb-global)
;; (semanticdb-enable-gnu-global-databases 'c-mode)
;; (semanticdb-enable-gnu-global-databases 'c++-mode)

;; ;; включить поддержку ctags для основных языков:
;; ;;  Unix Shell, Perl, Pascal, Tcl, Fortran, Asm
;; (semantic-load-enable-primary-exuberent-ctags-support)

;; (defun my-cedet-hook ()
;;   (local-set-key [(control return)] 'semantic-ia-complete-symbol)
;;   (local-set-key "\C-c?" 'semantic-ia-complete-symbol-menu)
;;   (local-set-key "\C-c>" 'semantic-complete-analyze-inline)
;;   (local-set-key "\C-cp" 'semantic-analyze-proto-impl-toggle))
;; (add-hook 'c-mode-common-hook 'my-cedet-hook)

(add-to-list 'load-path
                     "/home/vkuchuk/proj/tools/cscope-15.8a/contrib/xcscope")
(require 'xcscope)

; Show full file path in minibuffer
(defun show-file-name ()
  "Show the full path file name in the minibuffer."
  (interactive)
  (message (buffer-file-name)))

(global-set-key [C-f1] 'show-file-name)

;;END OF show name

; Run tags-apropos with current word
(defun tags-apropos-word ()
  "Run tags-apropos with current word"
  (interactive)
  (tags-apropos (thing-at-point 'word)))

(global-set-key [C-f3] 'tags-apropos-word)

;;END OF tags-apropos

; Run occur with current word
(defun occur-word ()
  "Run occur with current word"
  (interactive)
  (occur (thing-at-point 'word)))

(global-set-key (kbd "C-c o") 'occur-word)


; Run higlight-regexp with current word
(defun highlight-word ()
  "Run higlight-regexp with current word"
  (interactive)
  (highlight-regexp (thing-at-point 'word)))

(global-set-key (kbd "C-c h") 'highlight-word)

; Run unhiglight-regexp with current word
(defun unhighlight-word ()
  "Run higlight-regexp with current word"
  (interactive)
  (unhighlight-regexp (thing-at-point 'word)))

(global-set-key (kbd "C-c u") 'unhighlight-word)

; Run unhiglight-regexp for all highlights
(defun unhighlight-all ()
  "Run higlight-regexp with current word"
  (interactive)
  (unhighlight-regexp `(".+")))

(global-set-key (kbd "C-c U") 'unhighlight-all)

; Run grep in shell
(defun grep-filelist ()
  "Run grep with current word on list of files"
  (interactive)
  (shell-command (concat "cat $FIREFLY_HOME/cscope.files | xargs grep -n " (thing-at-point 'word)) "Grep List")
  (set-buffer (get-buffer "Grep List"))
  (grep-mode)

)
;  (shell-command (concat "cat $FIREFLY_HOME/cscope.files | xargs grep -n " (thing-at-point 'word)) "*grep*"))

(defun grep-matches ()
  "Run emacs grep on shell grep output"
  (interactive)
  (grep (concat "/" (grep-filelist)))
)

(global-set-key (kbd "C-c f") 'grep-filelist)


;; LOEWE
;; Open tags and cscope
(visit-tags-table "/home/vkuchuk/proj/TAGS")
(cscope-set-initial-directory "/home/vkuchuk/proj/")

; git-emacs
;(add-to-list 'load-path "~/bin/tsgates-git-emacs-86369ba")
;(require 'git-emacs)

; colors for ls otput
(add-hook 'shell-mode-hook 'ansi-color-for-comint-mode-on)

;(visit-tags-table "~/tags/TAGS")
;(cscope-set-initial-directory "~/tags/")


;;log4j settings
;;(load-file "~/bin/log4j-mode.el")

;;log4j settings
;;(load-file "~/bin/jtags.el")

;; c-style
(setq c-default-style "linux"
          c-basic-offset 4)

;; colors for ls otput
(add-hook 'shell-mode-hook 'ansi-color-for-comint-mode-on)

;; Change the way ComintMode (the basis of ShellMode) treats the input by adding a filter function.
(add-hook 'comint-output-filter-functions
            'comint-strip-ctrl-m)

; -*-Emacs-Lisp-*-
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;
; File:         dict.el
; Description:  Dict access functions
; Author:       Evan Sultanik
; Created:      Sun Aug 14 15:44:57 2005
; Modified:     Thu Nov 15 08:45:48 2007
; Language:     Emacs-Lisp
; Package:      N/A
;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;
;; *******************************************************
;; ***** THIS IS AN ALPHA TEST VERSION (Version 0.2) *****
;; *******************************************************
;;
;; dict.el
;; Copyright (C) 2005 Evan Sultanik (http://www.sultanik.com/)
;; 
;; This program is free software; you can redistribute it and/or modify
;; it under the terms of the GNU General Public License as published by
;; the Free Software Foundation; either version 1, or (at your option)
;; any later version.
;; 
;; This program is distributed in the hope that it will be useful,
;; but WITHOUT ANY WARRANTY; without even the implied warranty of
;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;; GNU General Public License for more details.
;; 
;; You should have received a copy of the GNU General Public License
;; along with this program; if not, write to the Free Software
;; Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
;; 
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
 
(defvar dict-protocol-client "dict"
  "This is the name and/or path to the local copy of the DICT protocol client.")
 
(defconst dict-scratch-buffer-name "*dict*"
  "This is the name of the buffer in which the dict output is displayed.")
 
(defun dict-extract-word ()
  "From the current buffer, extract and return the word under the cursor."
  (let (start word)
    (save-excursion
      (forward-char 1)
      (backward-word 1)
      (setq start (point))
      (forward-char 1)
      (if (not (re-search-forward "\\b"))
	  (error "Can't find end of word"))
      (buffer-substring start (point))
      )))
 
(defun dict-lookup-word (word dict)
  "Look up the word WORD using the client, given by
`dict-protocol-client'.  The results will be displayed in the buffer
given by `dict-scratch-buffer-name'.  If DICT is nil, WORD is looked
up from a thesaurus only."
  (interactive "sWord to lookup? \nP")
  (let ((dict-buffer (get-buffer-create dict-scratch-buffer-name)))
    (save-excursion
      (buffer-disable-undo (set-buffer dict-buffer))
      (setq buffer-read-only nil)
      (setq disable-point-adjustment t)
      (erase-buffer)
      (display-buffer dict-buffer)
      (if (null dict)
	  (call-process dict-protocol-client
			nil ;; no infile
			t   ;; put output in the current buffer
			t   ;; re-display as we get more output
			"-P" "-" "-d" "moby-thes" word)
	  (call-process dict-protocol-client
			nil ;; no infile
			t   ;; put output in the current buffer
			t   ;; re-display as we get more output
			"-P" "-" word)
	  )
      (setq buffer-read-only t)
      (goto-char (point-min))
      )
    ))
 
(defun thesaurus-lookup-word (word)
  (dict-lookup-word word nil))
 
(defun dictionary-lookup-word (word)
  (dict-lookup-word word t))
 
(defun thesaurus-lookup-word-in-text (exact)
  "Like `dict-lookup-word', but uses the word under the cursor."
  (interactive "P")
  (thesaurus-lookup-word (dict-extract-word)))
 
(defun dictionary-lookup-word-in-text (exact)
  "Like `dict-lookup-word', but uses the word under the cursor."
  (interactive "P")
  (dictionary-lookup-word (dict-extract-word)))
;;This code assumes that you have the command `dict' available.
;;You can set a keyboard shortcut as follows:
(global-set-key (quote [f7]) 'thesaurus-lookup-word-in-text)
(global-set-key (quote [f8]) 'dictionary-lookup-word-in-text)


; Create Header Guards with f12
(global-set-key [f12] 
                '(lambda () 
                   (interactive)
                   (if (buffer-file-name)
                       (let*
                           ((fName (upcase (file-name-nondirectory (file-name-sans-extension buffer-file-name))))
                            (ifDef (concat "#ifndef " fName "_H" "\n#define " fName "_H" "\n"))
                            (begin (point-marker))
                            )
                         (progn
                                        ; If less then 5 characters are in the buffer, insert the class definition
                           (if (< (- (point-max) (point-min)) 5 )
                               (progn
                                 (insert "\nclass " (capitalize fName) "{\npublic:\n\nprivate:\n\n};\n")
                                 (goto-char (point-min))
                                 (next-line-nomark 3)
                                 (setq begin (point-marker))
                                 )
                             )
                           
                                        ;Insert the Header Guard
                           (goto-char (point-min))
                           (insert ifDef)
                           (goto-char (point-max))
                           (insert "\n#endif" " //" fName "_H")
                           (goto-char begin))
                         )
                                        ;else
                     (message (concat "Buffer " (buffer-name) " must have a filename"))
                     )
                   )
                )