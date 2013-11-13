
if filereadable("~/proj/tags")
    set tags=~/proj/tags
endif
set tags=/home/vkuchuk/proj/tags


set softtabstop =2
set expandtab
set shiftwidth  =4
set nowrap
set sidescroll  =1
filetype plugin indent on
syntax on
"set cinoptions=:0,g0,i0,(s,m1

set history     =50
set ruler
set showcmd
set incsearch
set showmode
set number

let &path = &path . "," . substitute($INCL, ';', ',', 'g')

"colorscheme darkblue
if has('gui_running')
"    set guifont=console8x16:h14
"    set guifont=console8x16 14
endif


set tabstop=4
set nohlsearch
set et
" cscope add ~/tags/

set nowrap

fun! ShowFuncName()
  let lnum = line(".")
  let col = col(".")
  echohl ModeMsg
  echo getline(search("^[^ \t#/]\\{2}.*[^:]\s*$", 'bW'))
  echohl None
  call search("\\%" . lnum . "l" . "\\%" . col . "c")
endfun

fun! GrepWorkSpace()
  vimgrep /<C-R>=expand("<cword>")<CR>/gj `cat file.names`
  "cl
endfun
fun! MyFun()
    let shellcmd = '~/proj/rebuild_comp.sh'
    let out = system( shellcmd  )
endfun
map <F2> :cl <CR>
map <F3> :s/\.c_str()//g<CR>
"map <F3> :vimgrep /<C-R>=expand("<cword>")<CR>/gj `find ./ -name "*[ph]"` \| cl<CR>
map <F4> :e %:p:s,.h$,.X123X,:s,.cpp$,.h,:s,.X123X$,.cpp,<CR>
map <F5> :call ShowFuncName() <CR>
map <F6> :cn <CR>
"map <F7> : wa \| make -j 4 -f post_make <CR>
"map <F7> : !~/proj/rebuild_comp.sh \| !~/proj/rebuild_main.sh<CR>
map <F7> : !~/proj/rebuild_and_run.sh <CR>
"map <F7> : call MyFun() <CR>
map <F8> :  !~/proj/rebuild_comp.sh <CR>
"map <C-f> : !cat /home/gnx834/tags/cscope.files \| xargs grep  <C-R>=expand("<cword>")<CR> \|  cl<CR>
map <C-f> : !cat /home/vkuchuk/proj/cscope.files \| xargs grep  <C-R>=expand("<cword>")<CR>
map <C-i> : !ct lsview -cview <CR>
"map <F11> :tabnew  <C-R>=expand("<cfile>")<CR><CR>
map <F11> :!ct co -nc  %<CR>
"map <F3> :call GrepWorkSpace() <CR>
:nnoremap <silent> <F9> :let _s=@/<Bar>:%s/\s\+$//e<Bar>:let @/=_s<Bar>:nohl<CR>
"map <F8> :!/usr/bin/ctags -R --c++-kinds=+p --fields=+iaS --extra=+q .<CR>

